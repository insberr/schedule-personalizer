import { useSTV } from '../storage/studentvueData'
export function STVBoundery(props: { children: React.ReactNode | React.ReactNode[] }) {
  const stv = useSTV()
  if (stv.isVue) {
    return <>{props.children}</>
  } else {
    return <></>
  }
}

