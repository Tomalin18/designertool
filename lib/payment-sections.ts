export type PaymentPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"

export interface PaymentPropDefinition {
  control: PaymentPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface PaymentSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, PaymentPropDefinition>
}

export const paymentSections: PaymentSectionMeta[] = [
  {
    slug: "simple-three-tier-pricing",
    name: "Simple Three-Tier Pricing",
    componentName: "SimpleThreeTierPricing",
    description: "Classic three-column pricing cards with popular badge highlight.",
    tags: ["payment", "pricing", "card", "dark", "tier", "plan", "button", "check"],
    props: {
      plan1Name: {
        control: "text",
        default: "Starter",
        description: "Name of the first pricing tier.",
      },
      plan1Price: {
        control: "text",
        default: "$0",
        description: "Price for the first tier.",
      },
      plan1Desc: {
        control: "text",
        default: "For personal projects",
        description: "Description for the first tier.",
      },
      plan2Name: {
        control: "text",
        default: "Pro",
        description: "Name of the second (popular) pricing tier.",
      },
      plan2Price: {
        control: "text",
        default: "$29",
        description: "Price for the second tier.",
      },
      plan2Desc: {
        control: "text",
        default: "For growing teams",
        description: "Description for the second tier.",
      },
      plan3Name: {
        control: "text",
        default: "Enterprise",
        description: "Name of the third pricing tier.",
      },
      plan3Price: {
        control: "text",
        default: "$99",
        description: "Price for the third tier.",
      },
      plan3Desc: {
        control: "text",
        default: "For large scale",
        description: "Description for the third tier.",
      },
      showPopularBadge: {
        control: "boolean",
        default: true,
        description: "Show the 'POPULAR' badge on the second tier.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the pricing cards.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for highlights and buttons.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "toggle-pricing",
    name: "Toggle Pricing",
    componentName: "TogglePricing",
    description: "Monthly/yearly toggle pricing with discount badge.",
    tags: ["payment", "pricing", "toggle", "light", "switch", "discount", "card", "form"],
    props: {
      planName: {
        control: "text",
        default: "Pro Bundle",
        description: "Name of the pricing plan.",
      },
      monthlyPrice: {
        control: "text",
        default: "$24",
        description: "Monthly price.",
      },
      yearlyPrice: {
        control: "text",
        default: "$199",
        description: "Yearly price.",
      },
      discountText: {
        control: "text",
        default: "-20%",
        description: "Discount badge text for yearly.",
      },
      ctaText: {
        control: "text",
        default: "Get Started",
        description: "Call-to-action button text.",
      },
      showDiscount: {
        control: "boolean",
        default: true,
        description: "Show the discount badge.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for toggle and highlights.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "split-checkout",
    name: "Split Checkout",
    componentName: "SplitCheckout",
    description: "Two-column checkout with order summary and payment form.",
    tags: ["payment", "checkout", "form", "light", "split", "card", "input", "ecommerce"],
    props: {
      item1Name: {
        control: "text",
        default: "Ergonomic Chair",
        description: "Name of the first item.",
      },
      item1Price: {
        control: "text",
        default: "$249.00",
        description: "Price of the first item.",
      },
      item1Variant: {
        control: "text",
        default: "Black / Mesh",
        description: "Variant description for the first item.",
      },
      item2Name: {
        control: "text",
        default: "Laptop Stand",
        description: "Name of the second item.",
      },
      item2Price: {
        control: "text",
        default: "$49.00",
        description: "Price of the second item.",
      },
      item2Variant: {
        control: "text",
        default: "Aluminum",
        description: "Variant description for the second item.",
      },
      shippingCost: {
        control: "text",
        default: "$12.00",
        description: "Shipping cost.",
      },
      totalAmount: {
        control: "text",
        default: "$310.00",
        description: "Total amount to pay.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color for the order summary side.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for the pay button.",
      },
    },
  },
  {
    slug: "crypto-payment",
    name: "Crypto Payment",
    componentName: "CryptoPayment",
    description: "Cryptocurrency payment interface with QR code and address.",
    tags: ["payment", "crypto", "bitcoin", "dark", "qr", "wallet", "blockchain"],
    props: {
      title: {
        control: "text",
        default: "Pay with Crypto",
        description: "Title of the payment section.",
      },
      subtitle: {
        control: "text",
        default: "Send BTC to the address below.",
        description: "Subtitle instruction.",
      },
      walletAddress: {
        control: "text",
        default: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        description: "Cryptocurrency wallet address.",
      },
      confirmationStatus: {
        control: "text",
        default: "Awaiting confirmation... (1/3)",
        description: "Confirmation status text.",
      },
      backgroundColor: {
        control: "color",
        default: "#0d1117",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#f7931a",
        description: "Accent color (Bitcoin orange).",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "usage-pricing",
    name: "Usage Pricing",
    componentName: "UsagePricing",
    description: "Pay-as-you-go pricing with interactive slider.",
    tags: ["payment", "pricing", "slider", "dark", "usage", "calculator", "interactive"],
    props: {
      title: {
        control: "text",
        default: "Estimate your cost",
        description: "Main heading.",
      },
      subtitle: {
        control: "text",
        default: "Pay only for what you use.",
        description: "Supporting text.",
      },
      unitLabel: {
        control: "text",
        default: "Active Users",
        description: "Label for the usage unit.",
      },
      pricePerUnit: {
        control: "slider",
        default: 12,
        min: 1,
        max: 50,
        description: "Price per unit.",
      },
      minUnits: {
        control: "slider",
        default: 1,
        min: 1,
        max: 10,
        description: "Minimum units.",
      },
      maxUnits: {
        control: "slider",
        default: 100,
        min: 50,
        max: 500,
        description: "Maximum units.",
      },
      ctaText: {
        control: "text",
        default: "Start Trial",
        description: "Call-to-action button text.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#262626",
        description: "Background color of the calculator card.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for slider and highlights.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "method-selector",
    name: "Method Selector",
    componentName: "MethodSelector",
    description: "Payment method selection with card and PayPal options.",
    tags: ["payment", "checkout", "form", "light", "card", "paypal", "radio", "selector"],
    props: {
      title: {
        control: "text",
        default: "Select Payment Method",
        description: "Section title.",
      },
      cardLabel: {
        control: "text",
        default: "Card",
        description: "Label for card payment option.",
      },
      paypalLabel: {
        control: "text",
        default: "PayPal",
        description: "Label for PayPal option.",
      },
      savedCardLast4: {
        control: "text",
        default: "4242",
        description: "Last 4 digits of saved card.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for selected option.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "invoice-preview",
    name: "Invoice Preview",
    componentName: "InvoicePreview",
    description: "Clean invoice document preview with download option.",
    tags: ["payment", "invoice", "document", "light", "table", "download", "billing"],
    props: {
      companyName: {
        control: "text",
        default: "Acme Inc.",
        description: "Company name on the invoice.",
      },
      invoiceNumber: {
        control: "text",
        default: "#INV-2024-001",
        description: "Invoice number.",
      },
      billToName: {
        control: "text",
        default: "Alex Morgan",
        description: "Customer name.",
      },
      billToAddress: {
        control: "text",
        default: "123 Design St., San Francisco, CA",
        description: "Customer address.",
      },
      invoiceDate: {
        control: "text",
        default: "Oct 24, 2024",
        description: "Invoice date.",
      },
      item1Name: {
        control: "text",
        default: "Pro Subscription (Yearly)",
        description: "First line item name.",
      },
      item1Amount: {
        control: "text",
        default: "$199.00",
        description: "First line item amount.",
      },
      item2Name: {
        control: "text",
        default: "Extra Seat x2",
        description: "Second line item name.",
      },
      item2Amount: {
        control: "text",
        default: "$40.00",
        description: "Second line item amount.",
      },
      totalAmount: {
        control: "text",
        default: "$239.00",
        description: "Total invoice amount.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Background color of the section.",
      },
    },
  },
  {
    slug: "sub-manager",
    name: "Subscription Manager",
    componentName: "SubManager",
    description: "Subscription management card with usage and actions.",
    tags: ["payment", "subscription", "dark", "card", "progress", "management", "billing"],
    props: {
      planName: {
        control: "text",
        default: "Pro Plan",
        description: "Current plan name.",
      },
      planPrice: {
        control: "text",
        default: "$29",
        description: "Plan price.",
      },
      renewalDate: {
        control: "text",
        default: "Nov 24, 2024",
        description: "Next renewal date.",
      },
      storageUsed: {
        control: "text",
        default: "7.5GB",
        description: "Storage used.",
      },
      storageTotal: {
        control: "text",
        default: "10GB",
        description: "Total storage available.",
      },
      usagePercent: {
        control: "slider",
        default: 75,
        min: 0,
        max: 100,
        description: "Storage usage percentage.",
      },
      showCancelButton: {
        control: "boolean",
        default: true,
        description: "Show cancel subscription button.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the card.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for progress bar.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "success-state",
    name: "Success State",
    componentName: "SuccessState",
    description: "Payment success confirmation with transaction details.",
    tags: ["payment", "success", "confirmation", "light", "check", "receipt", "feedback"],
    props: {
      title: {
        control: "text",
        default: "Payment Successful!",
        description: "Success message title.",
      },
      subtitle: {
        control: "text",
        default: "Thank you for your purchase. A receipt has been sent to your email.",
        description: "Success message description.",
      },
      amountPaid: {
        control: "text",
        default: "$199.00",
        description: "Amount paid.",
      },
      transactionId: {
        control: "text",
        default: "tx_82739182",
        description: "Transaction ID.",
      },
      returnText: {
        control: "text",
        default: "Return to Dashboard",
        description: "Return link text.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      successColor: {
        control: "color",
        default: "#22c55e",
        description: "Success indicator color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for links.",
      },
    },
  },
  {
    slug: "comparison-table",
    name: "Comparison Table",
    componentName: "ComparisonTable",
    description: "Feature comparison table across pricing tiers.",
    tags: ["payment", "pricing", "table", "dark", "comparison", "features", "check"],
    props: {
      tier1Name: {
        control: "text",
        default: "Free",
        description: "First tier name.",
      },
      tier2Name: {
        control: "text",
        default: "Pro",
        description: "Second tier name.",
      },
      tier3Name: {
        control: "text",
        default: "Team",
        description: "Third tier name.",
      },
      feature1Name: {
        control: "text",
        default: "Projects",
        description: "First feature name.",
      },
      feature2Name: {
        control: "text",
        default: "Collaborators",
        description: "Second feature name.",
      },
      feature3Name: {
        control: "text",
        default: "Analytics",
        description: "Third feature name.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for Pro tier.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "visual-card-input",
    name: "Visual Card Input",
    componentName: "VisualCardInput",
    description: "Interactive credit card visualization with input fields.",
    tags: ["payment", "checkout", "form", "light", "card", "input", "visual", "credit-card"],
    props: {
      cardNumber: {
        control: "text",
        default: "4242 4242 4242 4242",
        description: "Card number to display.",
      },
      cardHolder: {
        control: "text",
        default: "John Doe",
        description: "Cardholder name.",
      },
      expiryDate: {
        control: "text",
        default: "12/25",
        description: "Card expiry date.",
      },
      cardBrand: {
        control: "text",
        default: "VISA",
        description: "Card brand name.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Background color of the section.",
      },
      cardGradientFrom: {
        control: "color",
        default: "#262626",
        description: "Card gradient start color.",
      },
      cardGradientTo: {
        control: "color",
        default: "#000000",
        description: "Card gradient end color.",
      },
    },
  },
  {
    slug: "addon-selector",
    name: "Addon Selector",
    componentName: "AddonSelector",
    description: "Plan customization with selectable add-ons.",
    tags: ["payment", "pricing", "checkout", "light", "addon", "checkbox", "customize"],
    props: {
      basePlanPrice: {
        control: "slider",
        default: 99,
        min: 10,
        max: 500,
        description: "Base plan price.",
      },
      addon1Name: {
        control: "text",
        default: "Priority Support",
        description: "First add-on name.",
      },
      addon1Price: {
        control: "slider",
        default: 19,
        min: 1,
        max: 100,
        description: "First add-on price.",
      },
      addon1Desc: {
        control: "text",
        default: "24/7 dedicated email line",
        description: "First add-on description.",
      },
      addon2Name: {
        control: "text",
        default: "Dedicated IP",
        description: "Second add-on name.",
      },
      addon2Price: {
        control: "slider",
        default: 29,
        min: 1,
        max: 100,
        description: "Second add-on price.",
      },
      addon2Desc: {
        control: "text",
        default: "Static IP for your instance",
        description: "Second add-on description.",
      },
      addon3Name: {
        control: "text",
        default: "Backup",
        description: "Third add-on name.",
      },
      addon3Price: {
        control: "slider",
        default: 9,
        min: 1,
        max: 100,
        description: "Third add-on price.",
      },
      addon3Desc: {
        control: "text",
        default: "Daily snapshots",
        description: "Third add-on description.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for selected items.",
      },
    },
  },
  {
    slug: "promo-input",
    name: "Promo Input",
    componentName: "PromoInput",
    description: "Discount code input with applied state.",
    tags: ["payment", "checkout", "form", "dark", "promo", "discount", "input", "coupon"],
    props: {
      label: {
        control: "text",
        default: "Discount Code",
        description: "Input label.",
      },
      promoCode: {
        control: "text",
        default: "WELCOME20",
        description: "Default promo code.",
      },
      savedAmount: {
        control: "text",
        default: "$24.00",
        description: "Amount saved with the code.",
      },
      successMessage: {
        control: "text",
        default: "Code applied! You saved",
        description: "Success message prefix.",
      },
      buttonText: {
        control: "text",
        default: "Apply",
        description: "Apply button text.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      successColor: {
        control: "color",
        default: "#22c55e",
        description: "Success state color.",
      },
    },
  },
  {
    slug: "billing-history",
    name: "Billing History",
    componentName: "BillingHistory",
    description: "Billing history table with download options.",
    tags: ["payment", "billing", "table", "light", "history", "invoice", "download"],
    props: {
      title: {
        control: "text",
        default: "Billing History",
        description: "Section title.",
      },
      row1Date: {
        control: "text",
        default: "Oct 01, 2024",
        description: "First row date.",
      },
      row1Amount: {
        control: "text",
        default: "$29.00",
        description: "First row amount.",
      },
      row2Date: {
        control: "text",
        default: "Sep 01, 2024",
        description: "Second row date.",
      },
      row2Amount: {
        control: "text",
        default: "$29.00",
        description: "Second row amount.",
      },
      row3Date: {
        control: "text",
        default: "Aug 01, 2024",
        description: "Third row date.",
      },
      row3Amount: {
        control: "text",
        default: "$29.00",
        description: "Third row amount.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for hover states.",
      },
    },
  },
  {
    slug: "enterprise-contact",
    name: "Enterprise Contact",
    componentName: "EnterpriseContact",
    description: "Enterprise plan contact CTA section.",
    tags: ["payment", "pricing", "enterprise", "dark", "cta", "contact", "sales"],
    props: {
      title: {
        control: "text",
        default: "Need a custom plan?",
        description: "Main heading.",
      },
      subtitle: {
        control: "text",
        default: "For large teams with specific security and support requirements, we offer tailored enterprise solutions.",
        description: "Supporting description.",
      },
      primaryCtaText: {
        control: "text",
        default: "Contact Sales",
        description: "Primary CTA button text.",
      },
      secondaryCtaText: {
        control: "text",
        default: "Read Documentation",
        description: "Secondary CTA button text.",
      },
      showSecondaryButton: {
        control: "boolean",
        default: true,
        description: "Show the secondary button.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "saved-methods",
    name: "Saved Methods",
    componentName: "SavedMethods",
    description: "Saved payment methods management interface.",
    tags: ["payment", "checkout", "card", "light", "saved", "management", "delete"],
    props: {
      title: {
        control: "text",
        default: "Saved Cards",
        description: "Section title.",
      },
      card1Brand: {
        control: "text",
        default: "VISA",
        description: "First card brand.",
      },
      card1Last4: {
        control: "text",
        default: "4242",
        description: "First card last 4 digits.",
      },
      card1Expiry: {
        control: "text",
        default: "12/25",
        description: "First card expiry.",
      },
      card2Brand: {
        control: "text",
        default: "Master",
        description: "Second card brand.",
      },
      card2Last4: {
        control: "text",
        default: "8899",
        description: "Second card last 4 digits.",
      },
      card2Expiry: {
        control: "text",
        default: "08/26",
        description: "Second card expiry.",
      },
      addNewText: {
        control: "text",
        default: "Add New Method",
        description: "Add new method button text.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for hover states.",
      },
    },
  },
  {
    slug: "micro-tipping",
    name: "Micro Tipping",
    componentName: "MicroTipping",
    description: "Small donation/tip widget with preset amounts.",
    tags: ["payment", "donation", "tipping", "light", "card", "button", "coffee"],
    props: {
      title: {
        control: "text",
        default: "Buy me a coffee",
        description: "Widget title.",
      },
      subtitle: {
        control: "text",
        default: "Support my work with a small donation.",
        description: "Widget description.",
      },
      amount1: {
        control: "slider",
        default: 1,
        min: 1,
        max: 10,
        description: "First preset amount.",
      },
      amount2: {
        control: "slider",
        default: 3,
        min: 1,
        max: 20,
        description: "Second preset amount.",
      },
      amount3: {
        control: "slider",
        default: 5,
        min: 1,
        max: 50,
        description: "Third preset amount.",
      },
      ctaText: {
        control: "text",
        default: "Support",
        description: "Support button text prefix.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      accentColor: {
        control: "color",
        default: "#fbbf24",
        description: "Accent color (yellow for coffee theme).",
      },
    },
  },
  {
    slug: "refund-request",
    name: "Refund Request",
    componentName: "RefundRequest",
    description: "Refund request form with reason selection.",
    tags: ["payment", "refund", "form", "light", "support", "radio", "request"],
    props: {
      title: {
        control: "text",
        default: "Request Refund",
        description: "Form title.",
      },
      subtitle: {
        control: "text",
        default: "We're sorry to see you go. Please select a reason for your refund request.",
        description: "Form description.",
      },
      reason1: {
        control: "text",
        default: "Bugs / Technical Issues",
        description: "First refund reason.",
      },
      reason2: {
        control: "text",
        default: "Accidental Purchase",
        description: "Second refund reason.",
      },
      reason3: {
        control: "text",
        default: "Not what I expected",
        description: "Third refund reason.",
      },
      reason4: {
        control: "text",
        default: "Other",
        description: "Fourth refund reason.",
      },
      submitText: {
        control: "text",
        default: "Submit Request",
        description: "Submit button text.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Cancel button text.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the section.",
      },
      dangerColor: {
        control: "color",
        default: "#dc2626",
        description: "Danger/warning color.",
      },
    },
  },
  {
    slug: "donation-slider",
    name: "Donation Slider",
    componentName: "DonationSlider",
    description: "Donation amount slider with impact messaging.",
    tags: ["payment", "donation", "slider", "dark", "nonprofit", "impact", "charity"],
    props: {
      title: {
        control: "text",
        default: "Make an impact",
        description: "Section title.",
      },
      impactText: {
        control: "text",
        default: "meals for families",
        description: "Impact description suffix.",
      },
      impactMultiplier: {
        control: "slider",
        default: 10,
        min: 1,
        max: 50,
        description: "Dollars per impact unit.",
      },
      minAmount: {
        control: "slider",
        default: 10,
        min: 1,
        max: 50,
        description: "Minimum donation amount.",
      },
      maxAmount: {
        control: "slider",
        default: 500,
        min: 100,
        max: 1000,
        description: "Maximum donation amount.",
      },
      defaultAmount: {
        control: "slider",
        default: 50,
        min: 10,
        max: 500,
        description: "Default donation amount.",
      },
      ctaText: {
        control: "text",
        default: "Donate",
        description: "Donate button text prefix.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#262626",
        description: "Card background color.",
      },
      accentColor: {
        control: "color",
        default: "#22c55e",
        description: "Accent color (green for donation).",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "trusted-pricing",
    name: "Trusted Pricing",
    componentName: "TrustedPricing",
    description: "Pricing section with trust badges and company logos.",
    tags: ["payment", "pricing", "trust", "light", "social-proof", "logos", "enterprise"],
    props: {
      trustText: {
        control: "text",
        default: "Trusted by 10,000+ companies",
        description: "Trust badge text.",
      },
      title: {
        control: "text",
        default: "Everything you need to scale.",
        description: "Main heading.",
      },
      subtitle: {
        control: "text",
        default: "Simple pricing, no hidden fees.",
        description: "Supporting text.",
      },
      price: {
        control: "text",
        default: "$49",
        description: "Price to display.",
      },
      priceUnit: {
        control: "text",
        default: "per user / month",
        description: "Price unit text.",
      },
      ctaText: {
        control: "text",
        default: "Start Free Trial",
        description: "CTA button text.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Pricing card background color.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color on the pricing card.",
      },
    },
  },
]







