export const NAVIGATION_LINKS = [
  {
    id: "00",
    name: "Dashboard",
    enabled: true,
    expanded: false,
    url: "",
    selected: true,
    icon: "fas fa-columns"
  },
  {
    id: "01",
    name: "Account Managment",
    expanded: false,
    enabled: true,
    url: "parent",
    icon: "fas fa-sitemap",
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
    expanded: false,
    enabled: true,
    url: "parent",
    selected: false,
    icon: "fas fa-book-open",
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
    expanded: false,
    enabled: true,
    url: "parent",
    selected: false,
    icon: "fas fa-cogs",

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
    expanded: false,
    enabled: true,
    url: "parent",
    selected: false,
    icon: "fas fa-briefcase",
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
      {
        id: "04-04",
        name: "Subsidiary Ledger",
        url: "reports/subsidaries",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-05",
        name: "Trial Balance detail",
        url: "reports/trial-balance-detail",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-06",
        name: "Consolidated Trial Balance",
        url: "reports/consolidated-trial-balance",
        expanded: false,
        enabled: true,
        selected: false
      },
      {
        id: "04-08",
        name: "Accounts Schedule",
        url: "reports/accounts-schedule",
        expanded: false,
        enabled: true,

        selected: false
      }
    ]
  }
];
