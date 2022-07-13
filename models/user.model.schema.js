import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({

    _id:String,
    name:{
        type: String,
        required: [true, 'El Nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'el email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Debe ingresar una contraseña']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

//Eliminar del objeto usuarios los datos que no queremos traer
UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
};

const userModel = mongoose.model('Users', UserSchema);

export default userModel;