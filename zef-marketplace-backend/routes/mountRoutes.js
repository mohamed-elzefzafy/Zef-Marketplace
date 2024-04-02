import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";


const mountRoutes = (app) => {
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/products" , productRoutes);
}



export default mountRoutes;