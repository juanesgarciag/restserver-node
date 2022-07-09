import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    
    role:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

const roleModel = mongoose.model('Roles', RoleSchema);

export default roleModel;