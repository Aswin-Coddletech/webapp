export const prefix = "homePage";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const GET_REWARDS = `${prefix}/GET_REWARDS`;

export const getRewards = () => ({
  type: GET_REWARDS,
  payload: [
    {
      key: "finnu_Rewards1",
      name: "Finnu Rewards 1"
    },
    {
      key: "finnu_Rewards2",
      name: "Finnu Rewards 2"
    },
    {
      key: "finnu_Rewards3",
      name: "Finnu Rewards 3"
    }
  ]
});

export const GET_LOANS = `${prefix}/GET_LOANS`;

export const getLoans = () => ({
  type: GET_LOANS,
  payload: [
    {
      key: "finnu_Loans1",
      name: "Finnu Loans 1"
    },
    {
      key: "finnu_Loans2",
      name: "Finnu Loans 2"
    },
    {
      key: "finnu_Loans3",
      name: "Finnu Loans 3"
    }
  ]
});

export const GET_BELONGINGS = `${prefix}/GET_BELONGINGS`;

export const getBelongings = () => ({
  type: GET_BELONGINGS,
  payload: [
    {
      key: "finnu_Belongings1",
      name: "Finnu Belongings 1"
    },
    {
      key: "finnu_Belongings2",
      name: "Finnu Belongings 2"
    }
  ]
});
