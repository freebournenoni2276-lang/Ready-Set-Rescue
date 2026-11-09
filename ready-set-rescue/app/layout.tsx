import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ready, Set, Rescue | Emergency Kit Quest',description:'Team up across devices, search four rooms and beat the clock in an emergency preparedness scavenger hunt.',icons:{icon:'/favicon.svg?v=2'}};
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
