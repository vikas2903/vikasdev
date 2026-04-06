import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

export default function Cartdrawer({
  open = true,
  onClose,
  currencySymbol = "₹",
  announcementText = "Get 10% Off order above 1999",
  offerTitle = "Hurry ! Offer ends in",
  offerSubtitle = "Get 10% Off order above 1999",
  checkoutLabel = "CHECKOUT",
  initialCountdownSeconds = 11 * 60 + 44,
  cartCount = 1,
  cartItem = {
    image:
      "https://cdn.shopify.com/s/files/1/0796/7847/2226/files/0-modelinfo-natalya-us2_af96314c-ec2a-4971-bca8-4667f3577226_180x.jpg?v=1766729426",
    title: "Elaia 3/4 Sleeve Top Purple",
    variant: "US 0 / Purple",
    price: 799,
    compareAt: 899,
    coupon: "FIXED100",
    qty: 1,
  },
  recommendations = [
    {
      id: "r1",
      image:
        "https://d2c-apps.myshopify.com/cdn/shop/files/0-modelinfo-niki-us2_8d913b31-ad45-4eeb-af7d-31f1fe301863.jpg?v=1766729428&width=300",
      title: "Here One Moment 3/4...",
      price: 899,
    },
    {
      id: "r2",
      image:
        "https://d2c-apps.myshopify.com/cdn/shop/files/0-modelinfo-niki-us2_8d913b31-ad45-4eeb-af7d-31f1fe301863.jpg?v=1766729428&width=300",
      title: "Elaia 3/4 Sleeve To...",
      price: 599,
    },
    {
      id: "r3",
      image:
        "https://d2c-apps.myshopify.com/cdn/shop/files/0-modelinfo-niki-us2_8d913b31-ad45-4eeb-af7d-31f1fe301863.jpg?v=1766729428&width=300",
      title: "Elaia 3/4 Sleeve To...",
      price: 799,
    },
  ],
  giftWrap = {
    enabled: false,
    label: "Gift wrap it @Rs. 799 only",
    price: 799,
  },
}) {
  const [qty, setQty] = useState(cartItem.qty || 1);
  const [gift, setGift] = useState(Boolean(giftWrap.enabled));
  const [secondsLeft, setSecondsLeft] = useState(
    Math.max(0, Number(initialCountdownSeconds) || 0)
  );

  useEffect(() => {
    if (!open) return;
    setSecondsLeft(Math.max(0, Number(initialCountdownSeconds) || 0));
  }, [open, initialCountdownSeconds]);

  useEffect(() => {
    if (!open) return undefined;
    if (secondsLeft <= 0) return undefined;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [open, secondsLeft]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const subtotal = useMemo(() => {
    const itemTotal = (Number(cartItem.price) || 0) * qty;
    const giftTotal = gift ? Number(giftWrap.price) || 0 : 0;
    return itemTotal + giftTotal;
  }, [cartItem.price, gift, giftWrap.price, qty]);

  const time = useMemo(() => {
    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;
    return {
      hh: String(h).padStart(2, "0"),
      mm: String(m).padStart(2, "0"),
      ss: String(s).padStart(2, "0"),
    };
  }, [secondsLeft]);

  const money = (n) => `${currencySymbol}${Number(n || 0).toFixed(2)}`;
  const moneyShort = (n) =>
    `${currencySymbol}${Math.round(Number(n || 0)).toLocaleString("en-IN")}`;

  if (!open) return null;

  return (
    <Root role="dialog" aria-modal="true" aria-label="Cart drawer">
      <Overlay onClick={() => onClose?.()} />
      <Drawer>
        <Header>
          <HeaderTitle>
            Your Cart <HeaderCount>({cartCount})</HeaderCount>
          </HeaderTitle>
          <CloseBtn type="button" aria-label="Close cart" onClick={() => onClose?.()}>
            ×
          </CloseBtn>
        </Header>

        <Content>
          <Announcement aria-label="Announcement">
            {announcementText}
          </Announcement>

          <OfferCard>
            <OfferTop>
              <Bolt aria-hidden="true" />
              <OfferTopText>{offerTitle}</OfferTopText>
              <Timer aria-label="Countdown">
                <TimerBox>{time.hh}</TimerBox>
                <TimerSep>:</TimerSep>
                <TimerBox>{time.mm}</TimerBox>
                <TimerSep>:</TimerSep>
                <TimerBox>{time.ss}</TimerBox>
              </Timer>
            </OfferTop>
            <OfferBottom>{offerSubtitle}</OfferBottom>
          </OfferCard>

          <ItemCard>
            <ItemRow>
              <ItemImage src={cartItem.image} alt={cartItem.title} />
              <ItemMain>
                <ItemTitleRow>
                  <ItemTitle>{cartItem.title}</ItemTitle>
                  <IconBtn type="button" aria-label="Remove item">
                    🗑
                  </IconBtn>
                </ItemTitleRow>
                <ItemVariant>{cartItem.variant}</ItemVariant>
                <ItemBottomRow>
                  <PriceRow>
                    <PriceNow>{money(cartItem.price)}</PriceNow>
                    {cartItem.compareAt ? (
                      <PriceCompare>{money(cartItem.compareAt)}</PriceCompare>
                    ) : null}
                  </PriceRow>
                  {cartItem.coupon ? (
                    <CouponPill>
                      <TagIcon aria-hidden="true" />
                      {cartItem.coupon}
                    </CouponPill>
                  ) : null}
                </ItemBottomRow>
              </ItemMain>

              <QtyWrap aria-label="Quantity">
                <QtyBtn
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  –
                </QtyBtn>
                <QtyValue aria-live="polite">{qty}</QtyValue>
                <QtyBtn
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </QtyBtn>
              </QtyWrap>
            </ItemRow>
          </ItemCard>

          <SectionTitle>You May Also Like</SectionTitle>
          <RecRow>
            {recommendations.map((r) => (
              <RecCard key={r.id}>
                <RecImg src={r.image} alt={r.title} />
                <RecAdd type="button">Add</RecAdd>
                <RecMeta>
                  <RecTitle title={r.title}>{r.title}</RecTitle>
                  <RecPrice>{moneyShort(r.price)}</RecPrice>
                </RecMeta>
              </RecCard>
            ))}
          </RecRow>

          <GiftRow>
            <GiftLeft>
              <GiftCheck
                type="checkbox"
                checked={gift}
                onChange={(e) => setGift(e.target.checked)}
                aria-label="Gift wrap"
              />
              <GiftIcon aria-hidden="true">🎁</GiftIcon>
              <GiftText>{giftWrap.label}</GiftText>
            </GiftLeft>
          </GiftRow>
        </Content>

        <Footer>
          <TotalWrap>
            <TotalLabel>Estimated Total</TotalLabel>
            <TotalValue>{money(subtotal)}</TotalValue>
          </TotalWrap>
          <CheckoutBtn type="button">{checkoutLabel}</CheckoutBtn>
        </Footer>
      </Drawer>
    </Root>
  );
}

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
`;

const Drawer = styled.aside`
  position: relative;
  width: min(420px, 100vw);
  height: 100%;
  background: #fff;
  box-shadow: -18px 0 40px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 18px 18px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  font: 700 22px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #222;
`;

const HeaderCount = styled.span`
  font-weight: 500;
  color: #555;
`;

const CloseBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  background: transparent;
  font: 500 28px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #222;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 0 14px 16px;
  overflow: auto;
`;
    
const Announcement = styled.div`
  margin: 0 0 10px;
  padding: 12px 12px;
  border-radius: 12px;
  background: #6f0b0b;
  color: #fff;
  text-align: center;
  font: 800 14px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
`;

const OfferCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const OfferTop = styled.div`
  background: linear-gradient(90deg, #3a0000, #7a0b0b);
  color: #fff;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OfferTopText = styled.div`
  font: 800 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  letter-spacing: 0.01em;
  flex: 1;
  text-align: center;
`;

const Timer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const TimerBox = styled.div`
  min-width: 30px;
  padding: 6px 6px;
  border-radius: 4px;
  background: #fff;
  color: #111;
  font: 800 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  text-align: center;
`;

const TimerSep = styled.span`
  color: #fff;
  font: 800 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
`;

const OfferBottom = styled.div`
  background: #7a0b0b;
  color: #fff;
  padding: 10px 12px;
  text-align: center;
  font: 700 14px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
`;

const ItemCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 12px;
  margin-bottom: 16px;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 86px 1fr auto;
  gap: 12px;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 12px;
  object-fit: cover;
  background: #f2f2f2;
`;

const ItemMain = styled.div`
  min-width: 0;
`;

const ItemTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const ItemTitle = styled.div`
  font: 800 15px/1.15 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #1c1c1c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.65;
  padding: 2px 4px;
  line-height: 1;
`;

const ItemVariant = styled.div`
  margin-top: 4px;
  font: 500 13px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #555;
`;

const ItemBottomRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const PriceNow = styled.div`
  font: 900 18px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #111;
`;

const PriceCompare = styled.div`
  font: 700 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #9a9a9a;
  text-decoration: line-through;
`;

const CouponPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #1b7a2d;
  color: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  font: 800 12px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
`;

const QtyWrap = styled.div`
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  background: #fff;
`;

const QtyBtn = styled.button`
  width: 36px;
  height: 34px;
  border: none;
  background: #fff;
  cursor: pointer;
  font: 700 18px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #222;
`;

const QtyValue = styled.div`
  width: 34px;
  text-align: center;
  font: 700 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #222;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  margin: 6px 0 10px;
  font: 500 22px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #6a6a6a;
`;

const RecRow = styled.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 6px 2px 10px;
  -webkit-overflow-scrolling: touch;
`;

const RecCard = styled.div`
  flex: 0 0 145px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  position: relative;
`;

const RecImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  background: #f2f2f2;
`;

const RecAdd = styled.button`
  position: absolute;
  top: 78px;
  right: 10px;
  border: none;
  background: #fff;
  color: #222;
  font: 700 12px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  padding: 8px 12px;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
  cursor: pointer;
`;

const RecMeta = styled.div`
  padding: 10px;
`;

const RecTitle = styled.div`
  font: 600 12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #555;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecPrice = styled.div`
  margin-top: 6px;
  font: 900 18px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #111;
`;

const GiftRow = styled.div`
  margin-top: 8px;
  padding: 12px 6px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const GiftLeft = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font: 600 16px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #3b3b3b;
`;

const GiftCheck = styled.input`
  width: 18px;
  height: 18px;
`;

const GiftIcon = styled.span`
  width: 18px;
  display: inline-flex;
  justify-content: center;
`;

const GiftText = styled.span``;

const Footer = styled.div`
  margin-top: auto;
  padding: 12px 14px 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
`;

const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TotalLabel = styled.div`
  font: 500 12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #666;
`;

const TotalValue = styled.div`
  font: 900 22px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #111;
`;

const CheckoutBtn = styled.button`
  height: 54px;
  padding: 0 26px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  background: #6f0b0b;
  color: #fff;
  font: 900 16px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  letter-spacing: 0.04em;
  min-width: 200px;
`;

const Bolt = styled.span`
  width: 18px;
  height: 18px;
  display: inline-block;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.18);
  position: relative;
  &::after {
    content: "⚡";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 14px;
  }
`;

const TagIcon = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  display: inline-block;
  &::after {
    content: "🏷";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 12px;
  }
`;