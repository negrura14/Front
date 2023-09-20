import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import DateTimeDisplay from '../Time/Time.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Imagen from '../../Img/Imagen1.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, cartUpdate, UpdateList } from '../../Redux/cartSlice';
import './Nav.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { clearUser } from '../../Redux/userSlice.jsx'
import { swAuth, userLogoutAct } from '../../Redux/userActions.jsx';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dropdown from 'react-bootstrap/Dropdown';

function Nav() {
  const location = useLocation();
  const detail = /^\/Detail\/\d+$/i.test(location.pathname);
  // const isCartOpen = useSelector(state => state.cart.isCartOpen);
  // const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state.user.userState)
  const isCartUpdated = useSelector(state => state.cart.cartUpdate)
  
  const userData = user;
  const navigate = useNavigate()

  //---------------sweet alert-------------------//

  const MySwal = withReactContent(Swal);

  const swalWithBootstrapButtons = MySwal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  //----------------------------------//
  

  const uniqueIds = {};
  let totalGames = 0;
  if(auth === true){
    const cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

    for (const element of cart) {
      if (!uniqueIds[element.id]) {
        uniqueIds[element.id] = true;
        totalGames += 1;
      }
    }
  }
// console.log("TEOTAL DE JUEGOS EN EL CARRITO: ", totalGames);

  const handleCartClick = () => {
    if(auth === true) {
      dispatch(UpdateList(userData.user.id));
      dispatch(toggleCart());
    }
    else {
      navigate('/login')
    }
  }


  const handlerSw = () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You are going to logout!",
      icon: 'warning',
      background: "#1d1d1d",
      showCancelButton: true,
      confirmButtonText: "Yes, I'm sure",
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Success!',
          'You will be logged out',
          'success'
        )
        if(userData.authMethod === 'google'){  
          dispatch(clearUser());
          dispatch(swAuth(!auth));
        } else if (userData.authMethod === 'local'){
          dispatch(userLogoutAct())
          document.cookie = 'miCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You will remain logged in',
          'error'
        )
      }
    })
 
  }
  
  // useEffect(() => {
  //   if (!auth){
  //     dispatch(cartUpdate())
  //   }
  // }, [isCartUpdated, dispatch])

  return (

    <div className="container-fluid nav-bar">
    <nav className="d-flex flex-wrap justify-content-between py-3 mb-2 border-bottom">
    <div className="d-flex flex-wrap justify-content-between mb-2">

    <div  >
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img  src={Imagen} width="80px" alt="" />
      </a>
    </div>
      <div className='text-left align-self-end px-2'>
      {!Array.isArray(userData) && <span className='text-white'>Welcome, {user.user.name}</span>}</div>
    </div>
      <div className="d-flex flex-wrap justify-content-center mb-1">
      <ul className="nav nav-pills mb-1">
        <li className="nav-item margCart"><NavLink className='nav-link teal' to={ROUTES.HOME}>Home</NavLink></li>
        <li className="nav-item"><NavLink className='nav-link' to={ROUTES.STORE}>Store</NavLink></li>
        {auth === false && <li className="nav-item"><NavLink className='nav-link' to={ROUTES.LOGIN}>Login</NavLink></li>}
        {auth === true && <li className="nav-item"><NavLink className="nav-link" to={ROUTES.CREATEGAME}>Create Game</NavLink></li>}
        {auth === true && 
        //<li className="nav-item"><NavLink className='nav-link bg-danger' onClick={handlerSw}>Logout</NavLink></li>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Options
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item ><NavLink to={ROUTES.PROFILEUSER}>Profile</NavLink></Dropdown.Item>
                <Dropdown.Item className="nav-item"><NavLink className='nav-link bg-danger' onClick={handlerSw}>Logout</NavLink></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
        
        {/* <NavDropdown
              id="nav-dropdown-dark-example"
              title="Create"
              menuVariant="dark"
            >
              <NavDropdown.Item ><NavLink className="nav-link" to={ROUTES.CREATEGAME}>Create Game</NavLink></NavDropdown.Item>
              <NavDropdown.Item >
              <NavLink className="nav-link" to={ROUTES.CREATEUSER}>Create User</NavLink>
              </NavDropdown.Item>
            </NavDropdown> */}


        <li className="color ps-3 pt-1 me-5" onClick={handleCartClick}>
        <i className="fa fa-shopping-cart cart"></i>
          <span className="item-count">{totalGames}</span>
        </li>

      </ul>
      <SearchBar />
      </div>
      
      
    </nav>
  </div>
  )
}

export default Nav
