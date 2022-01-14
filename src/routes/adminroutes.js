import AdminIndex from "../components/admin/AdminIndex";
import AddCategory from "../components/category/AddCategory";

const adminroutes = [
    {path: '/admin', exact: true, name: 'Admin', component: AdminIndex},
    // {path: "/owner/add-category", exact: true, component: AddCategory}
    // {path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
];

export default adminroutes;