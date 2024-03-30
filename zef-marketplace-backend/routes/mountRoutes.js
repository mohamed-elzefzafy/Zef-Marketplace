import userRoutes from "./userRoutes.js";


const mountRoutes = (app) => {
app.use("/api/v1/users" , userRoutes);
}



export default mountRoutes;