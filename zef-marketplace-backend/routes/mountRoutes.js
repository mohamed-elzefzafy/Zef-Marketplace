import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoute.js";
import bidRoutes from "./bidRoute.js";
import notificationRoutes from "./notificationRoute.js";

const mountRoutes = (app) => {
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/products" , productRoutes);
app.use("/api/v1/categories" , categoryRoutes);
app.use("/api/v1/bids" , bidRoutes);
app.use("/api/v1/notifications" , notificationRoutes);
}



export default mountRoutes;