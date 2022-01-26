import { NavLink } from "react-router-dom";
import styled from '@emotion/styled';

const NavWraper = styled.nav`
    margin: 0 0 70px 0;
    ul {
        display: flex;
    }
    li {
        list-style: none;
        padding: 5px 10px;
    }
    a {
        text-decoration: none;
        color: #333333;
        font-weight: 500;
        font-size: 16px;
        &.active {
            color: #1976d2;
        }
        &:hover {
            text-decoration: underline;
        }
    }
`

const Nav = () => {
    return <NavWraper>
        <ul>
            <li>
                <NavLink to="/" className={({isActive})=> (isActive ? 'active' : 'inactive')}>備忘錄</NavLink>
            </li>
            <li>
                <NavLink to="/weather" className={({isActive})=> (isActive ? 'active' : 'inactive')}>天氣預報</NavLink>
            </li>
            <li>
                <NavLink to="/shop" className={({isActive})=> (isActive ? 'active' : 'inactive')}>shop</NavLink>
            </li>
        </ul>
    </NavWraper>
}


export default Nav