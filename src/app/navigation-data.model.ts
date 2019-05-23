export const NAVIGATION_LINKS = [
  {
    id: "01",
    name: "Account Managment",
    expanded: true,
    enabled: true,
    icon: "../assets/a.jpg",
    selected: false,
    subChild: [
      {
        id: "01-01",
        name: "Account chart",
        url: "/accounts",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "01-02",
        name: "Account catagory",
        url: "/account-catagories",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "01-03",
        name: "Account Type",
        url: "/account-types",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "01-04",
        name: "Create new year data",
        url: "new-year-data",
        expanded: false,
        enabled: true,
        selected: false
      }
    ]
  },
  {
    id: "02",
    name: "Ledger Entries",
    expanded: true,
    enabled: true,
    icon: "../assets/a.jpg",
    selected: false,
    subChild: [
      {
        id: "02-01",
        name: "Ledger Entry View",
        url: "/ledgers",
        expanded: false,
        enabled: true,
        selected: false
      }
    ]
  },
  {
    id: "03",
    name: "Settings",
    expanded: true,
    enabled: true,
    selected: false,
    icon: "../assets/a.jpg",

    subChild: [
      {
        id: "03-01",
        name: "Lookup",
        url: "/lookups",
        expanded: false,
        enabled: true,
        selected: false
      }
    ]
  },
  {
    id: "04",
    name: "Reports",
    expanded: true,
    enabled: true,
    icon: "../assets/a.jpg",
    selected: false,
    subChild: [
      {
        id: "04-01",
        name: "Checklist",
        url: "/reports/checklist",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-02",
        name: "Balance Sheet",
        url: "/reports/balance-sheet",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-03",
        name: "Income Statement",
        url: "reports/income-statement",
        expanded: false,
        enabled: true,
        selected: false
      },
      /*       {
        id: "04-04",
        name: "COGS Schedule",
        url: "/cogs-schedule",
        expanded: false,
        enabled: true,
           icon: "../assets/a.jpg",
        selected: false
      }, */
      {
        id: "04-05",
        name: "Subsidiary Ledger",
        url: "reports/subsidaries",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-06",
        name: "Trial Balance detail",
        url: "reports/trial-balance-detail",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-07",
        name: "Consolidated Trial Balance",
        url: "reports/consolidated-trial-balance",
        expanded: false,
        enabled: true,
        selected: false
      }
      /*       {
        id: "04-08",
        name: "OE Cost Center",
        url: "/oe-cost-center",
        expanded: false,
        enabled: true,
           icon: "../assets/a.jpg",
        selected: false
      },
      {
        id: "04-09",
        name: "OE Detail",
        url: "/oe-detail",
        expanded: false,
        enabled: true,
           icon: "../assets/a.jpg",
        selected: false
      } */
    ]
  }
];
