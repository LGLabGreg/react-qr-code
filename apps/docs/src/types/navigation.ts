interface MenuItemProps {
  title: string
  url: string
  items?: MenuItemProps[]
  external?: boolean
}

export type { MenuItemProps }
