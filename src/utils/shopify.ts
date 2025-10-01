/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
//import { createAdminApiClient } from "@shopify/admin-api-client";
import {
	ShopifyProduct,
	CartItem,
	ReviewSummary,
	SubscriptionOption,
} from "@/types/shopify";
import { getYotpoReviewsPaginated, getYotpoReviewSummary } from "./yotpo";

// Note: Using 'any' types for Shopify API responses as they have complex nested structures
// that would require extensive type definitions for the GraphQL responses

// Storefront API client for public operations (products, cart)
const storefrontClient = createStorefrontApiClient({
	storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
	apiVersion: process.env.SHOPIFY_API_VERSION || "2024-10",
	publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// Admin API client for server-side operations
// const adminClient = createAdminApiClient({
// 	storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
// 	apiVersion: process.env.SHOPIFY_API_VERSION || "2024-01",
// 	accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
// });

// GraphQL queries
const PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
                sellingPlanAllocations(first: 10) {
                  edges {
                    node {
                      priceAdjustments {
                        price {
                          amount
                          currencyCode
                        }
                      }
                      sellingPlan {
                        id
                        name
                        options {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          tags
          productType
          vendor
          createdAt
          updatedAt
          # Simplified metafield queries - just the essential ones
          benefits: metafield(namespace: "my_fields", key: "benefits_description_") {
            value
            type
          }
          ingredients: metafield(namespace: "my_fields", key: "ingredients_description_") {
            value
            type
          }
          howToUse: metafield(namespace: "my_fields", key: "how_to_use_description_") {
            value
            type
          }
          whyStait: metafield(namespace: "my_fields", key: "why_stait_description_") {
            value
            type
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
            sellingPlanAllocations(first: 10) {
              edges {
                node {
                  priceAdjustments {
                    price {
                      amount
                      currencyCode
                    }
                  }
                  sellingPlan {
                    id
                    name
                    options {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
      options {
        id
        name
        values
      }
      tags
      productType
      vendor
      createdAt
      updatedAt
      # Simplified metafield queries - just the essential ones
      benefits: metafield(namespace: "my_fields", key: "benefits_description_") {
        value
        type
      }
      ingredients: metafield(namespace: "my_fields", key: "ingredients_description_") {
        value
        type
      }
      howToUse: metafield(namespace: "my_fields", key: "how_to_use_description_") {
        value
        type
      }
      whyStait: metafield(namespace: "my_fields", key: "why_stait_description_") {
        value
        type
      }
    }
  }
`;

const CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            sellingPlanAllocation {
              sellingPlan {
                id
                name
                options {
                  name
                  value
                }
              }
              priceAdjustments {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
              sellingPlanAllocation {
                sellingPlan {
                  id
                  name
                  options {
                    name
                    value
                  }
                }
                priceAdjustments {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CART_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Removed unused GraphQL queries - now using Yotpo API

// Helper function to parse subscription data from Seal Subscriptions selling plans
function parseSubscriptionData(
	sellingPlanAllocations: any,
	originalPrice: { amount: string; currencyCode: string },
): SubscriptionOption[] {
	if (!sellingPlanAllocations?.edges) return [];

	return sellingPlanAllocations.edges.map((edge: any) => {
		const allocation = edge.node;
		const sellingPlan = allocation.sellingPlan;
		const priceAdjustment = allocation.priceAdjustments[0];

		// Calculate discount percentage
		const originalAmount = parseFloat(originalPrice.amount);
		const subscriptionAmount = parseFloat(priceAdjustment.price.amount);
		const discountPercentage = Math.round(
			((originalAmount - subscriptionAmount) / originalAmount) * 100,
		);

		// Extract frequency from selling plan name and options
		const getFrequencyFromPlan = (planName: string, options: any[]) => {
			const name = planName.toLowerCase();
			const optionValue = options
				.find((opt) => opt.name === "Delivery every")
				?.value?.toLowerCase();

			// Check option value first
			if (optionValue) {
				if (optionValue.includes("month")) return "monthly";
				if (optionValue.includes("week")) return "weekly";
				if (optionValue.includes("year")) return "yearly";
			}

			// Fallback to plan name
			if (name.includes("monthly") || name.includes("month")) return "monthly";
			if (name.includes("weekly") || name.includes("week")) return "weekly";
			if (name.includes("quarterly") || name.includes("quarter"))
				return "quarterly";
			if (name.includes("yearly") || name.includes("year")) return "yearly";

			return "monthly"; // fallback
		};

		const frequency = getFrequencyFromPlan(
			sellingPlan.name,
			sellingPlan.options,
		);

		// Extract interval count from plan name or options
		const getIntervalCount = (planName: string, options: any[]) => {
			const name = planName.toLowerCase();
			const optionValue = options
				.find((opt) => opt.name === "Delivery every")
				?.value?.toLowerCase();

			// Look for numbers in the option value
			if (optionValue) {
				const match = optionValue.match(/(\d+)/);
				if (match) return parseInt(match[1]);
			}

			// Fallback to plan name
			const match = name.match(/(\d+)/);
			return match ? parseInt(match[1]) : 1;
		};

		return {
			id: sellingPlan.id.split("/").pop(), // Extract ID from gid
			title: sellingPlan.name,
			price: {
				amount: priceAdjustment.price.amount,
				currencyCode: priceAdjustment.price.currencyCode,
			},
			discount: {
				percentage: discountPercentage,
				amount: (originalAmount - subscriptionAmount).toFixed(2),
			},
			frequency: frequency,
			interval: getIntervalCount(sellingPlan.name, sellingPlan.options),
		};
	});
}

// Helper function to transform Shopify data
function transformProduct(
	productData: Record<string, unknown>,
): ShopifyProduct {
	const data = productData as any; // Type assertion for Shopify API response

	return {
		id: data.id as string,
		title: data.title as string,
		handle: data.handle as string,
		description: data.description as string,
		images: data.images.edges.map((edge: any) => ({
			id: edge.node.id,
			url: edge.node.url,
			altText: edge.node.altText || "",
		})),
		variants: data.variants.edges.map((edge: any) => ({
			id: edge.node.id,
			title: edge.node.title,
			price: edge.node.price,
			availableForSale: edge.node.availableForSale,
			selectedOptions: edge.node.selectedOptions,
		})),
		options: data.options,
		tags: data.tags,
		productType: data.productType,
		vendor: data.vendor,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
		metafields: {
			Benefits: data.benefits?.value || "",
			Ingredients: data.ingredients?.value || "",
			"How to use": data.howToUse?.value || "",
			"Why STAIT": data.whyStait?.value || "",
		},
		subscriptionOptions: parseSubscriptionData(
			data.variants.edges[0]?.node.sellingPlanAllocations,
			data.variants.edges[0]?.node.price || {
				amount: "0.00",
				currencyCode: "AUD",
			},
		),
	};
}

function transformCartItem(cartLine: any): CartItem {
	const merchandise = cartLine.merchandise;
	const sellingPlanAllocation = cartLine.sellingPlanAllocation;

	// Determine if this is a subscription based on selling plan allocation
	const isSubscription = !!sellingPlanAllocation;

	// Get the correct price (subscription price if available, otherwise regular price)
	const price =
		sellingPlanAllocation?.priceAdjustments?.[0]?.price || merchandise.price;

	// Create subscription option if this is a subscription
	const subscriptionOption = isSubscription
		? {
				id: sellingPlanAllocation.sellingPlan.id.split("/").pop(),
				title: sellingPlanAllocation.sellingPlan.name,
				price: price,
				frequency: getFrequencyFromPlan(
					sellingPlanAllocation.sellingPlan.name,
					sellingPlanAllocation.sellingPlan.options,
				),
				interval: getIntervalCount(
					sellingPlanAllocation.sellingPlan.name,
					sellingPlanAllocation.sellingPlan.options,
				),
				discount: sellingPlanAllocation.priceAdjustments?.[0]
					? {
							percentage: Math.round(
								((parseFloat(merchandise.price.amount) -
									parseFloat(price.amount)) /
									parseFloat(merchandise.price.amount)) *
									100,
							),
							amount: (
								parseFloat(merchandise.price.amount) - parseFloat(price.amount)
							).toFixed(2),
					  }
					: undefined,
		  }
		: undefined;

	return {
		id: cartLine.id,
		variantId: merchandise.id,
		quantity: cartLine.quantity,
		purchaseType: isSubscription ? "subscription" : "one-time",
		subscriptionOption: subscriptionOption,
		product: {
			id: merchandise.product.id,
			title: merchandise.product.title,
			handle: merchandise.product.handle,
			image: {
				url: merchandise.product.images.edges[0]?.node.url || "",
				altText: merchandise.product.images.edges[0]?.node.altText || "",
			},
			price: price,
		},
	};
}

// Helper functions for frequency and interval extraction
function getFrequencyFromPlan(
	planName: string,
	options: any[],
): "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly" {
	const name = planName.toLowerCase();
	const optionValue = options
		.find((opt) => opt.name === "Delivery every")
		?.value?.toLowerCase();

	// Check option value first
	if (optionValue) {
		if (optionValue.includes("month")) return "monthly";
		if (optionValue.includes("week")) return "weekly";
		if (optionValue.includes("year")) return "yearly";
	}

	// Fallback to plan name
	if (name.includes("monthly") || name.includes("month")) return "monthly";
	if (name.includes("weekly") || name.includes("week")) return "weekly";
	if (name.includes("quarterly") || name.includes("quarter"))
		return "quarterly";
	if (name.includes("yearly") || name.includes("year")) return "yearly";

	return "monthly"; // fallback
}

function getIntervalCount(planName: string, options: any[]): number {
	const name = planName.toLowerCase();
	const optionValue = options
		.find((opt) => opt.name === "Delivery every")
		?.value?.toLowerCase();

	// Look for numbers in the option value
	if (optionValue) {
		const match = optionValue.match(/(\d+)/);
		if (match) return parseInt(match[1]);
	}

	// Fallback to plan name
	const match = name.match(/(\d+)/);
	return match ? parseInt(match[1]) : 1;
}

// API functions
export async function getProducts(first: number = 20, after?: string) {
	try {
		const response = await storefrontClient.request(PRODUCTS_QUERY, {
			variables: { first, after },
		});

		if (response.data?.products) {
			return {
				products: response.data.products.edges.map((edge: any) =>
					transformProduct(edge.node),
				),
				pageInfo: response.data.products.pageInfo,
			};
		}

		throw new Error("No products found");
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
}

// Fetch all products with pagination
export async function getAllProducts(): Promise<ShopifyProduct[]> {
	const allProducts: ShopifyProduct[] = [];
	let hasNextPage = true;
	let cursor: string | undefined;

	while (hasNextPage) {
		try {
			const response = await getProducts(50, cursor);
			allProducts.push(...response.products);
			hasNextPage = response.pageInfo.hasNextPage;
			cursor = response.pageInfo.endCursor;
		} catch (error) {
			console.error("Error fetching products batch:", error);
			break;
		}
	}

	return allProducts;
}

export async function getProduct(handle: string) {
	try {
		const response = await storefrontClient.request(PRODUCT_QUERY, {
			variables: { handle },
		});

		if (response.data?.product) {
			return transformProduct(response.data.product);
		}

		throw new Error("Product not found");
	} catch (error) {
		console.error("Error fetching product:", error);
		throw error;
	}
}

export async function createCart() {
	try {
		const response = await storefrontClient.request(CREATE_CART_MUTATION, {
			variables: { input: {} },
		});

		if (response.data?.cartCreate?.cart) {
			const cart = response.data.cartCreate.cart;
			return {
				id: cart.id,
				lines: {
					edges: cart.lines.edges.map((edge: any) => ({
						node: transformCartItem(edge.node),
					})),
				},
				totalQuantity: cart.totalQuantity,
				cost: cart.cost,
			};
		}

		throw new Error("Failed to create cart");
	} catch (error) {
		console.error("Error creating cart:", error);
		throw error;
	}
}

export async function getCart(cartId: string) {
	try {
		const response = await storefrontClient.request(CART_QUERY, {
			variables: { cartId },
		});

		if (response.data?.cart) {
			const cart = response.data.cart;
			return {
				id: cart.id,
				lines: {
					edges: cart.lines.edges.map((edge: any) => ({
						node: transformCartItem(edge.node),
					})),
				},
				totalQuantity: cart.totalQuantity,
				cost: cart.cost,
			};
		}

		return null;
	} catch (error) {
		console.error("Error fetching cart:", error);
		return null;
	}
}

export async function addToCart(
	cartId: string,
	variantId: string,
	quantity: number = 1,
	sellingPlanId?: string,
) {
	try {
		const response = await storefrontClient.request(ADD_TO_CART_MUTATION, {
			variables: {
				cartId,
				lines: [
					{
						merchandiseId: variantId,
						quantity,
						sellingPlanId: sellingPlanId || null,
					},
				],
			},
		});

		if (response.data?.cartLinesAdd?.cart) {
			const cart = response.data.cartLinesAdd.cart;
			return {
				id: cart.id,
				lines: {
					edges: cart.lines.edges.map((edge: any) => ({
						node: transformCartItem(edge.node),
					})),
				},
				totalQuantity: cart.totalQuantity,
				cost: cart.cost,
			};
		}

		throw new Error("Failed to add to cart");
	} catch (error) {
		console.error("Error adding to cart:", error);
		throw error;
	}
}

export async function updateCartItem(
	cartId: string,
	lineId: string,
	quantity: number,
) {
	try {
		const response = await storefrontClient.request(UPDATE_CART_MUTATION, {
			variables: {
				cartId,
				lines: [
					{
						id: lineId,
						quantity,
					},
				],
			},
		});

		if (response.data?.cartLinesUpdate?.cart) {
			const cart = response.data.cartLinesUpdate.cart;
			return {
				id: cart.id,
				lines: {
					edges: cart.lines.edges.map((edge: any) => ({
						node: transformCartItem(edge.node),
					})),
				},
				totalQuantity: cart.totalQuantity,
				cost: cart.cost,
			};
		}

		throw new Error("Failed to update cart");
	} catch (error) {
		console.error("Error updating cart:", error);
		throw error;
	}
}

export async function removeFromCart(cartId: string, lineId: string) {
	try {
		const response = await storefrontClient.request(REMOVE_FROM_CART_MUTATION, {
			variables: {
				cartId,
				lineIds: [lineId],
			},
		});

		if (response.data?.cartLinesRemove?.cart) {
			const cart = response.data.cartLinesRemove.cart;
			return {
				id: cart.id,
				lines: {
					edges: cart.lines.edges.map((edge: any) => ({
						node: transformCartItem(edge.node),
					})),
				},
				totalQuantity: cart.totalQuantity,
				cost: cart.cost,
			};
		}

		throw new Error("Failed to remove from cart");
	} catch (error) {
		console.error("Error removing from cart:", error);
		throw error;
	}
}

// Removed unused transformReview function - now using Yotpo API

// Review API functions - Now using Yotpo API
export async function getProductReviews(
	productId: string,
	first: number = 10,
	after?: string,
) {
	try {
		return await getYotpoReviewsPaginated(productId, first, after);
	} catch (error) {
		console.error("Error fetching product reviews:", error);
		return {
			reviews: [],
			pageInfo: {
				hasNextPage: false,
				hasPreviousPage: false,
				startCursor: null,
				endCursor: null,
			},
		};
	}
}

export async function getReviewSummary(
	productId: string,
): Promise<ReviewSummary> {
	try {
		return await getYotpoReviewSummary(productId);
	} catch (error) {
		console.error("Error fetching review summary:", error);
		return {
			averageRating: 0,
			totalReviews: 0,
			ratingDistribution: Array.from({ length: 5 }, (_, i) => ({
				rating: i + 1,
				count: 0,
			})),
		};
	}
}

// Create a checkout using Shopify's Checkout API
export async function createCheckout(cart: any): Promise<string> {
	console.log("Full cart object:", cart);
	console.log("Cart type:", typeof cart);
	console.log("Cart keys:", Object.keys(cart || {}));

	if (!cart) {
		throw new Error("No cart provided");
	}

	// Check different possible cart structures
	const cartLines = cart.lines || cart.lines?.edges || cart;
	console.log("Cart lines structure:", cartLines);

	if (!cartLines || (Array.isArray(cartLines) && cartLines.length === 0)) {
		throw new Error("No cart items to checkout");
	}

	try {
		// Build line items for checkout with proper error handling
		// Handle different possible cart structures
		let lineItems: any[] = [];

		if (cart.lines?.edges) {
			// Standard cart structure with edges
			lineItems = cart.lines.edges
				.map((edge: any) => {
					console.log("Processing edge:", edge);
					const item = edge.node;
					console.log("Processing item:", item);

					// Check if item has the required structure (transformed cart item)
					if (!item || !item.variantId) {
						console.warn("Item missing variantId:", item);
						return null;
					}

					const variantId = item.variantId;
					const quantity = item.quantity || 1;
					// For transformed cart items, we need to reconstruct the selling plan ID
					const sellingPlanId = item.subscriptionOption?.id
						? `gid://shopify/SellingPlan/${item.subscriptionOption.id}`
						: null;

					console.log("Valid item found:", {
						variantId,
						quantity,
						sellingPlanId,
					});

					return {
						variantId,
						quantity,
						sellingPlanId: sellingPlanId || null,
					};
				})
				.filter(Boolean);
		} else if (Array.isArray(cartLines)) {
			// Direct array of cart items
			lineItems = cartLines
				.map((item: any) => {
					console.log("Processing direct item:", item);

					if (!item || !item.variantId) {
						console.warn("Item missing variantId:", item);
						return null;
					}

					const variantId = item.variantId;
					const quantity = item.quantity || 1;
					const sellingPlanId = item.subscriptionOption?.id
						? `gid://shopify/SellingPlan/${item.subscriptionOption.id}`
						: null;

					return {
						variantId,
						quantity,
						sellingPlanId: sellingPlanId || null,
					};
				})
				.filter(Boolean);
		} else {
			console.error("Unknown cart structure:", cart);
			throw new Error("Unknown cart structure");
		}

		console.log("Final line items:", lineItems);

		// Check if we have valid line items
		if (lineItems.length === 0) {
			console.error("No valid line items found. Cart structure:", {
				cart,
				lines: cart.lines,
				edges: cart.lines.edges,
			});
			throw new Error("No valid items found in cart for checkout");
		}

		// Create checkout mutation
		const CHECKOUT_CREATE_MUTATION = `
			mutation checkoutCreate($input: CheckoutCreateInput!) {
				checkoutCreate(input: $input) {
					checkout {
						id
						webUrl
						totalPrice {
							amount
							currencyCode
						}
						lineItems(first: 100) {
							edges {
								node {
									id
									title
									quantity
									variant {
										id
										title
										price {
											amount
											currencyCode
										}
									}
									sellingPlanAllocation {
										sellingPlan {
											id
											name
										}
									}
								}
							}
						}
					}
					userErrors {
						field
						message
					}
				}
			}
		`;

		const response = await storefrontClient.request(CHECKOUT_CREATE_MUTATION, {
			variables: {
				input: {
					lineItems,
				},
			},
		});

		if (response.data?.checkoutCreate?.checkout) {
			return response.data.checkoutCreate.checkout.webUrl;
		}

		if (response.data?.checkoutCreate?.userErrors?.length > 0) {
			throw new Error(
				response.data.checkoutCreate.userErrors
					.map((error: any) => error.message)
					.join(", "),
			);
		}

		throw new Error("Failed to create checkout");
	} catch (error) {
		console.error("Error creating checkout:", error);
		console.error("Cart data:", cart);
		console.error("Cart lines:", cart?.lines?.edges);
		throw error;
	}
}

// Fallback: Create checkout URL with cart items (for when checkout creation fails)
export function createFallbackCheckoutUrl(cart: any): string {
	if (!cart || !cart.lines?.edges?.length) {
		return `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/checkout`;
	}

	try {
		// Build checkout URL with cart items as parameters
		const baseUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart`;
		const items: string[] = [];

		cart.lines.edges.forEach((edge: any) => {
			const item = edge.node;

			// Skip items without valid merchandise
			if (!item.merchandise?.id) {
				console.warn("Skipping item without merchandise ID:", item);
				return;
			}

			const variantId = item.merchandise.id.split("/").pop(); // Extract variant ID
			const quantity = item.quantity || 1;

			// Handle selling plan (subscription)
			const sellingPlanId = item.sellingPlanAllocation?.sellingPlan?.id
				?.split("/")
				.pop();

			if (sellingPlanId) {
				// For subscription items, use the selling plan format
				items.push(`${variantId}:${quantity}:${sellingPlanId}`);
			} else {
				// For regular items
				items.push(`${variantId}:${quantity}`);
			}
		});

		// Create the checkout URL with items
		if (items.length > 0) {
			return `${baseUrl}/${items.join(",")}`;
		} else {
			return `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/checkout`;
		}
	} catch (error) {
		console.error("Error creating fallback checkout URL:", error);
		return `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/checkout`;
	}
}

// Create a cart with line items and return the checkout URL (Storefront API approach)
export async function createCheckoutFromItems(
	lineItems: any[],
): Promise<string> {
	if (!lineItems || lineItems.length === 0) {
		throw new Error("No line items provided for checkout");
	}

	try {
		console.log("Creating cart with line items:", lineItems);

		// Create cart mutation (Storefront API doesn't have checkoutCreate)
		const CART_CREATE_MUTATION = `
			mutation cartCreate($input: CartInput!) {
				cartCreate(input: $input) {
					cart {
						id
						checkoutUrl
						totalQuantity
						cost {
							totalAmount {
								amount
								currencyCode
							}
						}
						lines(first: 100) {
							edges {
								node {
									id
									quantity
									merchandise {
										... on ProductVariant {
											id
											title
											price {
												amount
												currencyCode
											}
										}
									}
									sellingPlanAllocation {
										sellingPlan {
											id
											name
										}
									}
								}
							}
						}
					}
					userErrors {
						field
						message
					}
				}
			}
		`;

		const response = await storefrontClient.request(CART_CREATE_MUTATION, {
			variables: {
				input: {
					lines: lineItems,
				},
			},
		});

		console.log("Cart API response:", response);

		// Check for GraphQL errors first
		if (response.errors && response.errors.graphQLErrors) {
			console.error("GraphQL errors:", response.errors.graphQLErrors);
			throw new Error(
				`GraphQL errors: ${response.errors.graphQLErrors
					.map((error: any) => error.message)
					.join(", ")}`,
			);
		}

		if (response.data?.cartCreate?.cart) {
			const checkoutUrl = response.data.cartCreate.cart.checkoutUrl;
			console.log("Cart created successfully, checkout URL:", checkoutUrl);
			return checkoutUrl;
		}

		if (response.data?.cartCreate?.userErrors?.length > 0) {
			console.error("Cart user errors:", response.data.cartCreate.userErrors);
			throw new Error(
				response.data.cartCreate.userErrors
					.map((error: any) => error.message)
					.join(", "),
			);
		}

		console.error("No cart created, response:", response);
		throw new Error("Failed to create cart - no cart object returned");
	} catch (error) {
		console.error("Error creating cart:", error);
		throw error;
	}
}

// Helper function to convert cart items to checkout line items
export function convertCartItemsToLineItems(cart: any): any[] {
	console.log("Converting cart to line items:", cart);

	if (!cart) {
		throw new Error("No cart provided");
	}

	// Handle different possible cart structures
	let cartItems: any[] = [];

	if (cart.lines?.edges) {
		// Standard cart structure with edges
		cartItems = cart.lines.edges.map((edge: any) => edge.node);
	} else if (Array.isArray(cart.lines)) {
		// Direct array of cart items
		cartItems = cart.lines;
	} else if (Array.isArray(cart)) {
		// Cart is the array itself
		cartItems = cart;
	} else {
		throw new Error("Unknown cart structure");
	}

	console.log("Cart items found:", cartItems);

	// Convert cart items to checkout line items
	const lineItems = cartItems
		.map((item: any) => {
			console.log("Processing cart item:", item);

			// Check if item has the required structure
			if (!item || !item.variantId) {
				console.warn("Item missing variantId:", item);
				return null;
			}

			const merchandiseId = item.variantId; // Use merchandiseId for CartLineInput
			const quantity = item.quantity || 1;
			// For transformed cart items, we need to reconstruct the selling plan ID
			const sellingPlanId = item.subscriptionOption?.id
				? `gid://shopify/SellingPlan/${item.subscriptionOption.id}`
				: null;

			console.log("Valid line item:", {
				merchandiseId,
				quantity,
				sellingPlanId,
			});

			// Return the correct format for CartLineInput
			const lineItem: any = {
				merchandiseId,
				quantity,
			};

			// Only add sellingPlanId if it exists
			if (sellingPlanId) {
				lineItem.sellingPlanId = sellingPlanId;
			}

			return lineItem;
		})
		.filter(Boolean);

	console.log("Final line items:", lineItems);

	if (lineItems.length === 0) {
		throw new Error("No valid items found in cart for checkout");
	}

	return lineItems;
}
