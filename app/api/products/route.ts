import { NextResponse } from 'next/server'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  period: 'month' | 'year' | 'forever'
  features: string[]
  popular?: boolean
  stripePriceId?: string
  stripeProductId?: string
}

export async function GET() {
  try {
    // 檢查是否有 Stripe 設定
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    
    if (!stripeSecretKey) {
      // 如果沒有 Stripe 設定，返回錯誤訊息
      console.warn('STRIPE_SECRET_KEY is not configured. Returning empty products list.')
      return NextResponse.json(
        { 
          products: [],
          error: 'STRIPE_SECRET_KEY is not configured',
          message: 'Please set STRIPE_SECRET_KEY in your environment variables'
        },
        { status: 200 } // 返回 200 但包含錯誤訊息
      )
    }

    // 動態導入 Stripe（避免在沒有安裝時出錯）
    let Stripe
    try {
      Stripe = (await import('stripe')).default
    } catch (error) {
      console.error('Stripe package not installed:', error)
      return NextResponse.json(
        { 
          products: [],
          error: 'Stripe package not installed',
          message: 'Please install stripe package: npm install stripe'
        },
        { status: 200 }
      )
    }

    // 初始化 Stripe，不指定 apiVersion 會使用最新穩定版本
    // 或者可以明確指定：apiVersion: '2024-11-20.acacia'
    const stripe = new Stripe(stripeSecretKey)

    // 檢查是否有指定要顯示的商品 ID（可選）
    // 格式：STRIPE_PRODUCT_IDS=prod_xxx,prod_yyy 或 STRIPE_PRODUCT_IDS=prod_xxx
    const productIdsEnv = process.env.STRIPE_PRODUCT_IDS
    const allowedProductIds = productIdsEnv 
      ? productIdsEnv.split(',').map(id => id.trim()).filter(Boolean)
      : null

    // 檢查是否有指定要顯示的價格 ID（可選）
    // 格式：STRIPE_PRICE_IDS=price_xxx,price_yyy 或 STRIPE_PRICE_IDS=price_xxx
    const priceIdsEnv = process.env.STRIPE_PRICE_IDS
    const allowedPriceIds = priceIdsEnv
      ? priceIdsEnv.split(',').map(id => id.trim()).filter(Boolean)
      : null

    // 從 Stripe 獲取商品和價格資訊
    let stripeProducts
    let stripePrices

    if (allowedProductIds && allowedProductIds.length > 0) {
      // 如果指定了商品 ID，只獲取這些商品
      // 使用 Promise.allSettled 避免單個商品錯誤導致整個請求失敗
      const productResults = await Promise.allSettled(
        allowedProductIds.map(id => stripe.products.retrieve(id))
      )
      const successfulProducts = productResults
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value)
      
      if (successfulProducts.length === 0) {
        console.warn('No valid products found with the specified IDs')
        return NextResponse.json({ products: [] })
      }
      
      stripeProducts = { data: successfulProducts }
    } else {
      // 否則獲取所有活躍商品
      stripeProducts = await stripe.products.list({ active: true, limit: 100 })
    }

    if (allowedPriceIds && allowedPriceIds.length > 0) {
      // 如果指定了價格 ID，只獲取這些價格
      // 使用 Promise.allSettled 避免單個價格錯誤導致整個請求失敗
      const priceResults = await Promise.allSettled(
        allowedPriceIds.map(id => stripe.prices.retrieve(id))
      )
      const successfulPrices = priceResults
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value)
      
      if (successfulPrices.length === 0) {
        console.warn('No valid prices found with the specified IDs')
        return NextResponse.json({ products: [] })
      }
      
      stripePrices = { data: successfulPrices }
    } else {
      // 否則獲取所有活躍價格
      stripePrices = await stripe.prices.list({ active: true, limit: 100 })
    }

    // 組合商品和價格資料
    const products: Product[] = []

    for (const product of stripeProducts.data) {
      // 找到這個商品的所有價格
      const productPrices = stripePrices.data.filter(
        (price) => price.product === product.id
      )

      if (productPrices.length === 0) {
        // 如果商品沒有價格，跳過
        continue
      }

      for (const price of productPrices) {
        // 判斷計費週期
        let period: 'month' | 'year' | 'forever' = 'forever'
        if (price.recurring) {
          if (price.recurring.interval === 'month') {
            period = 'month'
          } else if (price.recurring.interval === 'year') {
            period = 'year'
          }
        }

        // 從商品 metadata 或 description 提取功能列表
        const features: string[] = []
        if (product.metadata?.features) {
          try {
            features.push(...JSON.parse(product.metadata.features))
          } catch {
            // 如果不是 JSON，當作換行分隔的字串處理
            features.push(...product.metadata.features.split('\n').filter(Boolean))
          }
        } else if (product.description) {
          // 如果沒有 metadata，嘗試從 description 解析
          features.push(...product.description.split('\n').filter(Boolean))
        }
        
        // 如果還是沒有功能，根據產品名稱提供預設功能列表
        if (features.length === 0) {
          const productNameLower = product.name.toLowerCase()
          if (productNameLower.includes('free')) {
            features.push(
              'Browse all component previews',
              'View most component detail pages',
              'Component code viewing',
              'Component property customization',
              'Live component preview',
              'Component export functionality'
            )
          } else if (productNameLower.includes('pro') || productNameLower.includes('paid')) {
            features.push(
              'Browse all component previews',
              'View all component detail pages',
              'Access MediaPlayer component',
              'Access ChatInterface component',
              'Component code viewing',
              'Component property customization',
              'Live component preview',
              'Component export functionality'
            )
          }
        }

        products.push({
          id: `${product.id}_${price.id}`,
          name: product.name,
          description: product.description || '',
          price: price.unit_amount ? price.unit_amount / 100 : 0, // Stripe 價格以分為單位
          currency: price.currency.toUpperCase(),
          period,
          features,
          popular: product.metadata?.popular === 'true',
          stripePriceId: price.id,
          stripeProductId: product.id,
        })
      }
    }

    // 如果沒有從 Stripe 獲取到任何商品，返回空陣列並提供提示
    if (products.length === 0) {
      console.warn('No products found in Stripe. Make sure you have created products and prices in your Stripe dashboard.')
      return NextResponse.json(
        { 
          products: [],
          warning: 'No products found',
          message: 'No products found in Stripe. Please create products and prices in your Stripe dashboard, or check your STRIPE_PRODUCT_IDS and STRIPE_PRICE_IDS environment variables.'
        },
        { status: 200 }
      )
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products from Stripe:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // 檢查是否是 Stripe API 錯誤
    if (errorMessage.includes('No such') || errorMessage.includes('Invalid')) {
      return NextResponse.json(
        { 
          products: [],
          error: 'Invalid Stripe configuration',
          message: `Stripe API error: ${errorMessage}. Please check your STRIPE_SECRET_KEY and product/price IDs.`
        },
        { status: 200 }
      )
    }
    
    return NextResponse.json(
      { 
        products: [],
        error: 'Failed to fetch products',
        message: errorMessage
      },
      { status: 200 }
    )
  }
}

