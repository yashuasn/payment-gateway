import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import PaymentModal from "./ContactInformation";

import Pg, { PgModalProps } from "./Pg";

export default {
  title: "Components/PaymentModal",
  component: PaymentModal,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const PgNew: Story<PgModalProps> = (args) => <Pg {...args} />;
export const pg = PgNew.bind({});
pg.args = {
  isOpen: true,
  // clientCode: "DEMO1",
  // clientTxnId: "TESTING12052205040225"
  clientCode: "TM001",
  clientTxnId: "TESTING061022024803815"
};
// export const Secondary = Template.bind({});
// Secondary.args = { ...Primary.args, primary: false, isOpen:false,label: "Secondary 😇" };
