import express from 'express';
import plantService from '../service/PlantService.js '; 

export const PlantRoute = express.Router();

PlantRoute.get('/', async (req, res) => {
    try {
        const usuarios = await plantService.getAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: error.message });
    }
});

PlantRoute.get('/:id', async (req, res) => {
    try {
        const usuario = await plantService.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        res.status(500).json({ message: error.message });
    }
});

PlantRoute.post('/', async (req, res) => {
    try {
        const novoUsuario = await plantService.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: error.message });
    }
});

PlantRoute.put('/:id', async (req, res) => { 
    try {
        const usuarioAtualizado = await plantService.update(req.params.id, req.body);
        res.json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: error.message });
    }
});


PlantRoute.patch('/:id', async (req, res) => {
    try {
        const usuarioAtualizadoParcial = await plantService.patch(req.params.id, req.body);
        res.json(usuarioAtualizadoParcial);
    } catch (error) {
        console.error('Erro ao atualizar parcialmente o usuário:', error);
        res.status(500).json({ message: error.message });
    }
});



PlantRoute.delete('/:id', async (req, res) => {
    try {
        const resultado = await plantService.delete(req.params.id);
        res.json(resultado);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ message: error.message });
    }
});
