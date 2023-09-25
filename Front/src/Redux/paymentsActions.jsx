import axios from "axios";
import { getPaymentStatistics } from "./Reducers/paymentsSlice";

export const getAllPayments = () => async (dispatch) => {
    try {
        const response = await axios("/payment");
        return dispatch(getPaymentStatistics(response.data))
    } catch (error) {
        console.error("Request failed:", error);
    }
}

// export const getGame = () => async  (dispatch) =>{
//     try {
//         const response = await axios("/games");
//       //  return dispatch({type: getAllGame, payload: response.data});
//         return dispatch(getAllGame(response.data));
//       } catch (error) {
//         window.alert("Request failed:", error);
//       }
//   }

//  /MercadoPago  para post
//* 

// export const getGamesId = (id) => async (dispatch) =>{ 
//     try {
//         const response = await axios(`/games/${id}`);
//         return dispatch(getGameById(response.data));
//       } catch (error) {
//         window.alert("Request failed:", error);
//       }
// }