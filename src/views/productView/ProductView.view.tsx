"use client";
import React from "react";
import styles from "./ProductView.module.scss";
import { Button, Modal, message } from "antd";
import ProductInformationCart from "./subViews/productInformationCart/ProductInformationCart.component";
import PaymentInformation from "./subViews/paymentInformation/PaymentInformation.component";
import ShippingInformation from "./subViews/ShippingInformation.component";
import Review from "./subViews/review/Review.component";
import { useCartStore } from "@/state/cart";
import { AnimatePresence, m, motion } from "framer-motion";
import { validateForm } from "@/utils/validateForm";
import TitleContainer from "@/components/titleContainer/TitleContainer.UI";
import usePostData from "@/state/actions/usePostData";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { MdOutlineCreditCard, MdOutlineLocalShipping } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";

const ProductView = () => {
  const { mutate: placeOrder } = usePostData({
    url: "/order",
    key: "placeOrder",
  });

  const {
    step,
    cart,
    advanceToNextSignUpStep,
    goBackToPreviousSignUpStep,
    isGoingToPreviousStep,
    setStep,
    currentForm,
    setPaymentInformationValues,
    setBillingInformationValues,
    setShippingInformationValues,
    setUserInformationValues,
    paymentInformationValues,
    billingInformationValues,
    shippingInformationValues,
    userInformationValues,
    setCartSteps,
  } = useCartStore();
  const steps = [
    {
      title: "Cart",
      component: <ProductInformationCart />,
      nextButtonText: "Proceed to Payment",
      hideBackButton: true,
      hideNextButton: false,
      nextButtonDisabled: cart.length === 0,
      nextButtonAction: () => advanceToNextSignUpStep(),
    },
    {
      title: "Payment",
      component: <PaymentInformation />,
      nextButtonText: "Proceed to Shipping",
      backButtonText: "Back to Cart",
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: async () => {
        if (await validateForm(currentForm)) {
          console.log(currentForm.getFieldsValue().userInfo);
          setUserInformationValues(currentForm.getFieldsValue().userInfo);
          setPaymentInformationValues(currentForm.getFieldsValue().paymentInfo);
          setBillingInformationValues(currentForm.getFieldsValue().billing);
          // if the shipping information is the same as the billing information, skip the shipping step
          if (currentForm.getFieldsValue().userInfo.sameAsShipping) {
            setShippingInformationValues(currentForm.getFieldsValue().billing);
            advanceToNextSignUpStep(3);
            return;
          }
          advanceToNextSignUpStep();
        } else message.error("Please fill out the form correctly");
      },
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
    {
      title: "Shipping",
      component: <ShippingInformation />,
      nextButtonText: "Review Order",
      backButtonText: "Back to Payment",
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: async () => {
        if (await validateForm(currentForm)) {
          setShippingInformationValues(currentForm.getFieldsValue());
          advanceToNextSignUpStep();
          return;
        } else message.error("Please fill out the form correctly");
      },
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
    {
      title: "Review",
      component: <Review />,
      nextButtonText: "Place Order",
      backButtonText: "Back to Shipping",
      hideNextButton: false,
      nextButtonDisabled: false,
      hideBackButton: false,
      backButtonAction: () => goBackToPreviousSignUpStep(),
      nextButtonAction: async () => {
        Modal.confirm({
          title: "Are you sure you want to place this order?",
          content:
            "Once the order processes, you'll receive an email and a receipt with your order number that you can use to track the progress of your order.",
          onOk() {
            console.log("Order placed");
            try {
              placeOrder({
                cart: cart,
                user: userInformationValues,
                payment: paymentInformationValues,
                billing: billingInformationValues,
                shipping: shippingInformationValues,
              });
              advanceToNextSignUpStep();
            } catch (error) {
              console.log(error);
              return;
            }
          },
          onCancel() {
            console.log("Order canceled");
            return;
          },
        });
      },
    },
    {
      title: "Order Placed",
      component: (
        <TitleContainer
          title="Order Placed"
          subtitle="Your order has been placed, keep an eye out in your email for your order details!"
        />
      ),
      hideNextButton: true,
      hideBackButton: true,
    },
  ];

  // check the cart length, if at any point the cart is empty, go back to the first step
  React.useEffect(() => {
    if (cart.length === 0) {
      setStep(0);
    }
    // set the steps for the cart
    setCartSteps([
      { title: "Cart", icon: <ShoppingCartOutlined /> },
      { title: "Payment", icon: <MdOutlineCreditCard /> },
      { title: "Shipping", icon: <MdOutlineLocalShipping /> },
      { title: "Review", icon: <FaClipboardCheck /> },
    ] as any);
  }, [cart]);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            className={styles.formContainer}
            initial={{
              x: isGoingToPreviousStep ? -80 : 80,
              opacity: 0,
              scale: 0.99,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            key={step}
          >
            {steps[step]?.component}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.actionContainer}>
        {!steps[step].hideBackButton && (
          <Button
            type="text"
            className={styles.backButton}
            onClick={steps[step]?.backButtonAction || goBackToPreviousSignUpStep}
          >
            Back
          </Button>
        )}
        {!steps[step].hideNextButton && (
          <Button
            type="primary"
            onClick={() => {
              steps[step]?.nextButtonAction!();
            }}
            disabled={steps[step]?.nextButtonDisabled}
            className={styles.nextButton}
          >
            {steps[step]?.nextButtonText || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductView;
