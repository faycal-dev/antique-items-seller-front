import React from "react";
import {
  CardWrapper,
  CardPriceWrapper,
  PriceText,
  RatingText,
  CardTitleWrapper,
  CardButton,
  CardStatWrapper,
  ButtonContainer,
  LinkText,
} from "./productCardElements";
import { Heart, ShoppingCart, Star, X } from "react-feather";
import { useRouter } from "next/router";
import Image from "next/image";
import colors from "../../constants/colors";
import { Spinner } from "react-bootstrap";

function ProductCard({ product, isAdmin }) {
  const router = useRouter();

  const PushToDetailsPage = (slug) => {
    router.push(`/home/${encodeURIComponent(slug)}`);
  };

  return (
    <CardWrapper id={product.id}>
      <div
        className="align-self-center my-3"
        onClick={() => PushToDetailsPage(product.slug)}
      >
        <Image
          src={product.product_image[0].image}
          width={250}
          height={200}
          quality={100}
          alt={product.alt_text}
        />
      </div>
      <CardPriceWrapper onClick={() => PushToDetailsPage(product.slug)}>
        <RatingText>
          <Star
            size={22}
            color={colors.warning}
            fill={colors.warning}
            style={{ marginTop: -5 }}
          />{" "}
          {product.rating}
        </RatingText>
        <PriceText>{product.regular_price} $</PriceText>
      </CardPriceWrapper>
      <CardTitleWrapper onClick={() => PushToDetailsPage(product.slug)}>
        <RatingText>{product.title}</RatingText>
      </CardTitleWrapper>
      <CardStatWrapper>
        <ButtonContainer>
          {isAdmin ? (
            <CardButton onClick={() => PushToDetailsPage(product.slug)}>
              <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
              />
            </CardButton>
          ) : (
            <CardButton onClick={() => PushToDetailsPage(product.slug)}>
              <LinkText>Bid Now</LinkText>
            </CardButton>
          )}
        </ButtonContainer>
      </CardStatWrapper>
    </CardWrapper>
  );
}

export default ProductCard;
