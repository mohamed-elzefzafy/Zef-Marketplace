import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoute.js";


const mountRoutes = (app) => {
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/products" , productRoutes);
app.use("/api/v1/categories" , categoryRoutes);
}



export default mountRoutes;