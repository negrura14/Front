import './CardT.css'
import {Link} from 'react-router-dom'
import React, { useEffect } from 'react'
import { ROUTES } from '../../Helpers/RoutesPath'


function Card (props) {
const {game} = props;
// console.log("Esto es lo que muestra el GAME dentro de CARDT: ", game.id);
    return ( <>
    <div class="col-md-4 col-sm-6 mb-5 " key={game.id}>
        <div class="product-grid card-st">
        <span class="badge">{game.name}</span>
            <div class="product-image">
                <a href="#" class="image">
                    <img class="pic-1" src={game.image}/>
                </a>
                <ul class="product-links">
                    
                    <li> <Link to={ROUTES.DETAIL + "/" + game.id}><a href="" data-tip="Details"><i class="fa fa-search"></i></a></Link></li>
                    <li><a href="" data-tip="Add to Cart"><i class="fa fa-shopping-bag"></i></a></li>
                </ul>
                <div class="price">{game.price}$</div>
            </div>
        </div>
    </div>
    </>
    )
}






// function Card(props) {
//    const{id, nombre, imagen, types}= props; //Estoy haciendo un distroctoring al props
//     return (
//         <div className='cardPoke'>
//             <Link className='namePoke' to={`/detail/${id}`}>
//                 <h2 className='text'>{nombre}</h2>
//             </Link>
//             <img className='img' src={imagen} alt='' />
//             <div className='{style.ss}'> 
//                 <h2 className='typeText'>
                    
//                     {types && types.map((type, index) => (
//                         <span key={index} className='type'>
//                             {type.name}
//                             {index !== types.length - 1 && 
//                             <span className='typeSeparator'>{" "}-{" "}</span>}
//                         </span>
//                     ))}
//                 </h2>
//             </div>
//         </div>
//     );
// };
export default Card;
