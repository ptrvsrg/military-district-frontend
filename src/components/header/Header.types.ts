export interface HeaderProps {
  accountUrl?: string
  homeUrl?: string
  selectedTab?: string
  tabs: [
    {
      name: string
      url?: string
    },
  ]
}
