const UsersModel = require("../models/UsersModel");
const CustomError = require("../utils/customError");

const getUsers = async (req,res) =>{
    //TRAEMOS LOS USUARIOS DE LA DB Y CONTESTAMOS
    try {
        const {gender, plus18} = req.query; 
        if(req.params.email){
            const user = await UsersModel.findOne({email:req.params.email});
            res.status(200).json({user})
        }else{
            let users;
            if(gender){
                users = await UsersModel.find({gender:gender});
            }else if(plus18){
                users = await UsersModel.find({age:{$gte:18}});
            }
            else{
                 users = await UsersModel.find();
            }
            res.status(200).json({users})
        }
    } catch (error) {
        res.status(error.code || 500).json({message:'Ocurrió un error: '+ error.code})
    }
}

const addUser = async(req,res) => {
    try {
        console.log(req.body);
        const newUser = new UsersModel(req.body);
        const user = await newUser.save();
        if(!user) throw new CustomError('Falló el guardado');
        res.status(201).json({message:'El usuario se creó correctamente, ', user});
    } catch (error) {
        res.status(error.code<600? error.code : 500).json({message:'Ocurrio un error: '+error.code})
    }
}

const deleteUser = async(req, res) =>{
    try {
        const {id} = req.body;
        const userDeleted = await UsersModel.findByIdAndDelete(id);
        if(!userDeleted) throw new CustomError('No existe el usuario especificado', 404);
        res.status(200).json({message:'Usuario borrado'});
    } catch (error) {
        res.status(error.code<600? error.code : 500).json({message:'Ocurrió un error. Motivo: '+error.message})
    }
}

const editUser = async(req, res) =>{
    try {
        const {email, fields} = req.body;
        const userModified = await UsersModel.findOneAndUpdate({email:email}, fields, {new:true});
        res.status(200).json({message:'El usuario se actualizo correctamente', userModified})
    } catch (error) {
        res.status(error.code<600? error.code : 500).json({message:'Ocurrió un error. Motivo: '+error.message})
    }
}


module.exports = {
    getUsers,
    addUser,
    deleteUser,
    editUser
};