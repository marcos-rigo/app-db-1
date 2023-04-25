const {Schema, model} = require('mongoose');

const UserShema = new Schema({
    name:{
        type:String,
        lowercase:true,
        trim:true,
        minLength:[2,'Debe tener más de un carácter'],
        maxLength:[40,'No puede tenes más de 40 carácteres']
    },
    lastname:{
        type:String,
        uppercase:true,
        trim:true,
        minLength:[2,'debe tener más de un carácter'],
        maxLength:[40,'No puede tenes más de 40 carácteres']
    },
    email:{
        type:String,
        required:[true, 'El email es obligatorio'],
        unique:[true, 'Ya existe un email registrado con esa dirección'],
        trim:true
    },
    age:{
        type:Number,
        select:false,
        min:[0, 'La edad puede ser de 0 en adelante'],
        max:[123, 'Si tenés más de 123 años, es un nuevo record, dirigete al libro de los Guinnes']
    },
    gender:{
        type:String,
        enum:['M','F']
    },
    admin:{
        type: Boolean,
        default:false
    },
    hobbies: Array
},{
    versionKey:false,
    timestamps: true
})

module.exports = model('User', UserShema);