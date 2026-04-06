import React, { useState, useEffect } from "react";
import styled from "styled-components";

const UNIT_PRICE = 1498;
const GIFT_PRICE = 799;

/* -------------------- STYLES -------------------- */

const Body = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: #fff;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background:#fff;
`;

const CartWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid #eee;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
`;

const CountdownBanner = styled.div`
  background: #6b0f1a;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px 18px;
`;

const CountdownLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeBox = styled.span`
  background: #fff;
  color: #6b0f1a;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 3px;
  min-width: 34px;
  text-align: center;
`;

const ShippingBanner = styled.div`
  background: #8b1a1a;
  color: #fff;
  text-align: center;
  padding: 9px 18px;
  margin: 6px 0 0;
`;

const CartItem = styled.div`
  padding: 16px 18px;
  border-bottom: 1px solid #f0f0f0;
  background:#fff;
`;

const ItemInner = styled.div`
  display: flex;
  gap: 14px;
`;

const ItemImage = styled.img`
  width: 110px;
  height: 135px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

const ItemVariant = styled.div`
  color: #777;
  font-size: 13px;
  margin-bottom: 10px;
`;

const Pricing = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Price = styled.span`
  font-weight: 700;
`;

const Mrp = styled.span`
  text-decoration: line-through;
  color: #aaa;
`;

const Coupon = styled.span`
  background: #22a850;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const QtyRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
`;

const QtyControl = styled.div`
  display: flex;
  border: 1px solid #ccc;
`;

const QtyBtn = styled.button`
  width: 36px;
  height: 34px;
  border: none;
  background: white;
  font-size: 20px;
  cursor: pointer;
`;

const QtyValue = styled.div`
  width: 42px;
  text-align: center;
  line-height: 34px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

const RecsSection = styled.div`
  padding: 20px 18px;
 
`;

const RecTitle = styled.div`
  font-size: 18px;
  color: #555;
  margin-bottom: 16px;
`;

const RecScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
`;

const RecCard = styled.div`
  background: #fff;
  border-radius: 10px;
  min-width: 160px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
`;

const RecImageWrap = styled.div`
  position: relative;
`;

const RecImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
`;

const RecAddBtn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  border: none;
  padding: 6px 16px;
  font-weight: 700;
  border-radius: 6px;
`;

const RecInfo = styled.div`
  padding: 10px;
`;

const GiftWrapRow = styled.div`
  padding: 14px 18px;
  border-top: 1px solid #eee;
  background:#fff;
`;

const CheckoutBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  background: white;
  border-top: 1px solid #ddd;
  display: flex;
  padding: 10px;
`;

const TotalBlock = styled.div`
  padding: 10px 18px;
`;

const TotalAmount = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

const CheckoutBtn = styled.button`
  flex: 1;
  background: #6b0f1a;
  color: white;
  border: none;
  font-weight: 800;
  letter-spacing: 2px;
  cursor: pointer;
`;

/* -------------------- COMPONENT -------------------- */

export default function Cart() {

  const [qty, setQty] = useState(2);
  const [giftWrap, setGiftWrap] = useState(false);
  const [seconds, setSeconds] = useState(11 * 3600 + 7 * 60 + 13);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  const total = UNIT_PRICE * qty + (giftWrap ? GIFT_PRICE : 0);

  return (
    <Body>

      <CartWrapper>

        <CartHeader>
          <h2>Your Cart ({qty})</h2>
          <CloseBtn>✕</CloseBtn>
        </CartHeader>

        <CountdownBanner>

          <CountdownLeft>
            <span>Hurry ! Offer ends in</span>
          </CountdownLeft>

          <Timer>
            <TimeBox>{hrs}</TimeBox> :
            <TimeBox>{mins}</TimeBox> :
            <TimeBox>{secs}</TimeBox>
          </Timer>

        </CountdownBanner>

        <ShippingBanner>
          Free shipping order above 999
        </ShippingBanner>

        <CartItem>

          <ItemInner>

            <ItemImage src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80" />

            <ItemDetails>

              <ItemName>Elaia 3/4 Sleeve Top Grey Marle</ItemName>
              <ItemVariant>US 0 / Grey Marle</ItemVariant>

              <Pricing>
                <Price>₹1,498</Price>
                <Mrp>₹1,598</Mrp>
                <Coupon>FIXED100</Coupon>
              </Pricing>

              <QtyRow>

                <QtyControl>

                  <QtyBtn onClick={() => qty > 1 && setQty(qty - 1)}>
                    −
                  </QtyBtn>

                  <QtyValue>{qty}</QtyValue>

                  <QtyBtn onClick={() => setQty(qty + 1)}>
                    +
                  </QtyBtn>

                </QtyControl>

              </QtyRow>

            </ItemDetails>

          </ItemInner>

        </CartItem>

        <RecsSection>

          <RecTitle>You May Also Like</RecTitle>

          <RecScroll>

            <RecCard>
              <RecImageWrap>
                <RecImage src="https://images.unsplash.com/photo-1772442088712-df1780cbb709?q=80&w=870" />
                <RecAddBtn>Add</RecAddBtn>
              </RecImageWrap>

              <RecInfo>
                Here One Moment 3/4... <br />
                <strong>Rs. 899</strong>
              </RecInfo>
            </RecCard>

            <RecCard>
              <RecImageWrap>
                <RecImage src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80" />
                <RecAddBtn>Add</RecAddBtn>
              </RecImageWrap>

              <RecInfo>
                Elaia 3/4 Sleeve To... <br />
                <strong>Rs. 599</strong>
              </RecInfo>
            </RecCard>

          </RecScroll>

        </RecsSection>

        <GiftWrapRow>

          <label>
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={(e) => setGiftWrap(e.target.checked)}
            />

            🎁 <strong>Gift wrap it</strong> @Rs. 799 only

          </label>

        </GiftWrapRow>

        <CheckoutBar>

          <TotalBlock>
            Estimated Total
            <TotalAmount>
              ₹{total.toLocaleString("en-IN")}.00
            </TotalAmount>
          </TotalBlock>

          <CheckoutBtn>
            CHECKOUT
          </CheckoutBtn>

        </CheckoutBar>

      </CartWrapper>

    </Body>
  );
}