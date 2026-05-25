import React, { useEffect, useRef, useState } from "react";

const TRY_ON_API_URL = "http://localhost:4004/try-on";

const products = [
  {
    id: "women-kurti-01",
    category: "Women's Kurti",
    gender: "women",
    garmentType: "upper_body",
    name: "Floral Anarkali Kurta Set",
    price: "$79.00",
    originalPrice: "$109.00",
    rating: "4.9",
    reviews: "218 reviews",
    description:
      "An elegant women's kurta with a soft floral print, flowing silhouette, and festive-ready look.",
    features: [
      "Lightweight ethnic wear silhouette",
      "Floral print with graceful fall",
      "Suitable for festive and casual occasions",
      "Try-on preview with your uploaded image",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Rose Pink", value: "#cf7c91" },
      { name: "Ivory", value: "#f3eadc" },
      { name: "Olive Gold", value: "#9b9460" },
    ],
    image:
      "https://www.prisachi.com/cdn/shop/files/C9E53261-BCA7-4B32-A324-567C11D5C591.jpg?auto=format&fit=crop&w=900&q=80",
    garmentDescription: "women floral anarkali kurta",
    accent: "#b65f47",
    panelBackground: "linear-gradient(180deg, #f8e3db 0%, #f2d4c7 100%)",
  },
  {
    id: "men-shirt-01",
    category: "Men's Shirt",
    gender: "men",
    garmentType: "upper_body",
    name: "Classic Oxford Shirt",
    price: "$64.00",
    originalPrice: "$88.00",
    rating: "4.7",
    reviews: "143 reviews",
    description:
      "A crisp men's oxford shirt designed for everyday smart-casual wear with a tailored finish.",
    features: [
      "Refined everyday smart-casual fit",
      "Classic collar and clean front placket",
      "Versatile for office and weekend wear",
      "Supports try-on preview with your image",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Sky Blue", value: "#83a8d8" },
      { name: "White", value: "#f4f4f0" },
      { name: "Navy", value: "#243447" },
    ],
    image:
      "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP4908.jpg?auto=format&fit=crop&w=900&q=80",
    garmentDescription: "men blue oxford shirt",
    accent: "#41678b",
    panelBackground: "linear-gradient(180deg, #dae8f7 0%, #c9daef 100%)",
  },
  {
    id: "men-jeans-01",
    category: "Men's Jeans",
    gender: "men",
    garmentType: "lower_body",
    name: "Slim Fit Denim Jeans",
    price: "$72.00",
    originalPrice: "$96.00",
    rating: "4.6",
    reviews: "192 reviews",
    description:
      "A clean slim-fit denim style for everyday wear, designed to pair easily with shirts, tees, and jackets.",
    features: [
      "Modern slim fit silhouette",
      "Classic blue denim wash",
      "Works as a lower-body try-on product",
      "Comfortable style for daily wear",
    ],
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Indigo", value: "#2f4a73" },
      { name: "Mid Blue", value: "#5278a6" },
      { name: "Charcoal", value: "#42464d" },
    ],
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    garmentDescription: "men slim fit blue denim jeans",
    accent: "#34577f",
    panelBackground: "linear-gradient(180deg, #d7e3ef 0%, #c2d3e4 100%)",
  },
];

const buttonBaseStyle = {
  padding: "16px 28px",
  borderRadius: "14px",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
};

const cardBaseStyle = {
  border: "1px solid #ece5dc",
  borderRadius: "20px",
  padding: "18px",
  background: "#fffaf7",
};

const Productpage = () => {
  const fileInputRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState("");
  const [tryOnImage, setTryOnImage] = useState("");
  const [maskedImage, setMaskedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const product = products.find((item) => item.id === selectedProductId) || products[0];

  useEffect(() => {
    if (!selectedFile) {
      setUploadedPreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setUploadedPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    setTryOnImage("");
    setMaskedImage("");
    setErrorMessage("");
  }, [selectedProductId]);

  const handleTryOnClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setTryOnImage("");
    setMaskedImage("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("productName", product.name);
      formData.append("clothImage", product.image);
      formData.append("garmentDescription", product.garmentDescription);
      formData.append("garmentType", product.garmentType);
      formData.append("gender", product.gender);
      formData.append("category", product.category);

      const response = await fetch(TRY_ON_API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Try-on failed");
      }

      if (!data.outputUrl) {
        throw new Error("No try-on image returned from API");
      }

      setTryOnImage(data.outputUrl);
      setMaskedImage(data.maskedImageUrl || "");
    } catch (error) {
      console.error("Try on error:", error);
      setErrorMessage(error.message || "Unable to generate try-on image");
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  const helperText =
    product.garmentType === "lower_body"
      ? "Upload a clear full-body image so the jeans area can be matched better."
      : product.garmentType === "full_body"
        ? "Upload a clear full-body image for the best full outfit try-on result."
        : "Upload a clear portrait or full-body image to preview this garment on you.";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8efe8 0%, #f3e1d6 100%)",
        padding: "40px 20px",
        color: "#2a1d1a",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 24px",
          padding: "22px",
          borderRadius: "24px",
          background: "#fffaf7",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.08)",
        }}
      >
        <p
          style={{
            margin: "0 0 14px",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a6a5d",
          }}
        >
          Product Switcher
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {products.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedProductId(item.id)}
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border: selectedProductId === item.id ? "none" : "1px solid #e2d6cf",
                background: selectedProductId === item.id ? item.accent : "#ffffff",
                color: selectedProductId === item.id ? "#ffffff" : "#3f302b",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 18px 60px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <div
            style={{
              background: product.panelBackground,
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "520px",
                borderRadius: "24px",
                objectFit: "cover",
                boxShadow: "0 14px 40px rgba(0, 0, 0, 0.12)",
              }}
            />
          </div>

          <div style={{ padding: "48px 40px" }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <p
              style={{
                margin: "0 0 12px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: product.accent,
              }}
            >
              {product.category} | {product.gender} | {product.garmentType}
            </p>

            <h1
              style={{
                margin: "0 0 16px",
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                lineHeight: 1.05,
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "2rem", fontWeight: 700 }}>{product.price}</span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#8b8b8b",
                  textDecoration: "line-through",
                }}
              >
                {product.originalPrice}
              </span>
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "999px",
                  background: "#f7ebe6",
                  color: product.accent,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                }}
              >
                {product.rating} / 5 | {product.reviews}
              </span>
            </div>

            <p
              style={{
                margin: "0 0 28px",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#5f514d",
              }}
            >
              {product.description}
            </p>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1rem" }}>Select Size</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.sizes.map((size, index) => (
                  <button
                    key={size}
                    type="button"
                    style={{
                      minWidth: "54px",
                      height: "48px",
                      padding: "0 14px",
                      borderRadius: "12px",
                      border: "1px solid #dfc8be",
                      background: index === 2 ? "#2a1d1a" : "#ffffff",
                      color: index === 2 ? "#ffffff" : "#2a1d1a",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1rem" }}>Select Color</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    type="button"
                    aria-label={color.name}
                    title={color.name}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: index === 0 ? "3px solid #2a1d1a" : "1px solid #cfcfcf",
                      background: color.value,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              <button
                type="button"
                onClick={handleTryOnClick}
                disabled={isLoading}
                style={{
                  ...buttonBaseStyle,
                  border: `1px solid ${product.accent}`,
                  background: isLoading ? "#ead9d2" : "#fbe9e1",
                  color: product.accent,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Generating..." : `Try On ${product.category}`}
              </button>
              <button
                type="button"
                style={{
                  ...buttonBaseStyle,
                  border: "none",
                  background: "#2a1d1a",
                  color: "#ffffff",
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                style={{
                  ...buttonBaseStyle,
                  border: "1px solid #dfc8be",
                  background: "#ffffff",
                  color: "#2a1d1a",
                }}
              >
                Buy Now
              </button>
            </div>

            <p
              style={{
                margin: "0 0 24px",
                fontSize: "0.94rem",
                color: "#6f5f5a",
              }}
            >
              {helperText}
            </p>

            {errorMessage ? (
              <div
                style={{
                  marginBottom: "24px",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  background: "#fff1ef",
                  color: "#b42318",
                  border: "1px solid #f4c7c3",
                }}
              >
                {errorMessage}
              </div>
            ) : null}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
                marginBottom: "18px",
              }}
            >
              <div style={cardBaseStyle}>
                <h3 style={{ margin: "0 0 12px", fontSize: "1rem" }}>Your Uploaded Image</h3>
                {uploadedPreview ? (
                  <img
                    src={uploadedPreview}
                    alt="Uploaded preview"
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "320px",
                      borderRadius: "16px",
                      background: "#f4ece7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "#8a7b75",
                      padding: "20px",
                    }}
                  >
                    Choose an image with the Try On button to preview it here.
                  </div>
                )}
              </div>

              <div style={cardBaseStyle}>
                <h3 style={{ margin: "0 0 12px", fontSize: "1rem" }}>Wear-On Result</h3>
                {tryOnImage ? (
                  <img
                    src={tryOnImage}
                    alt={`${product.name} try on result`}
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "320px",
                      borderRadius: "16px",
                      background: "#f4ece7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "#8a7b75",
                      padding: "20px",
                    }}
                  >
                    {isLoading
                      ? "Generating the try-on result..."
                      : "Your generated wear-on image will appear here after upload."}
                  </div>
                )}
              </div>
            </div>

            {maskedImage ? (
              <div style={{ ...cardBaseStyle, marginBottom: "32px" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: "1rem" }}>Mask Preview</h3>
                <img
                  src={maskedImage}
                  alt="Mask preview"
                  style={{
                    width: "100%",
                    maxHeight: "320px",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </div>
            ) : null}

            <div
              style={{
                borderTop: "1px solid #ece5dc",
                paddingTop: "24px",
              }}
            >
              <h3 style={{ margin: "0 0 14px", fontSize: "1rem" }}>Product Highlights</h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  color: "#5f514d",
                  lineHeight: 1.9,
                }}
              >
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
