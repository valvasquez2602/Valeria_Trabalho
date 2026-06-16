import { pool } from '../config/db.js';
import 'dotenv/config';

class PlantService {

    async getAll() {
        try {
            const result = await pool.query(
                'SELECT id, nome, email, bio FROM usuarios'
            );
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw new Error('Erro ao listar usuários');
        }
    }

    async getById(id) {
        try {
            const result = await pool.query(
                'SELECT id, nome, email, bio FROM usuarios WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw new Error('Erro ao buscar usuário por ID');
        }   
    }

    async create(dadosUsuario) {
        try {
            const { nome, email, senha } = dadosUsuario;
            const result = await pool.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
                [nome, email, senha]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new Error('Erro ao criar usuário');
        }
    }

    async update(id, dadosUsuario) {
        try {
            const { nome, email, bio } = dadosUsuario;
            const result = await pool.query(
                'UPDATE usuarios SET nome = $1, email = $2, bio = $3 WHERE id = $4 RETURNING id, nome, email, bio',
                [nome, email, bio, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw new Error('Erro ao atualizar usuário');
        }
    }

    async patch(id, dadosParciais) {
        try {
            const campos = [];
            const valores = [];
            let contador = 1;

            for (const [chave, valor] of Object.entries(dadosParciais)) {
                campos.push(`${chave} = $${contador}`);
                valores.push(valor);
                contador++;
            }

            if (campos.length === 0) throw new Error('Nenhum campo enviado para atualização');

            valores.push(id); 
            const queryText = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = $${contador} RETURNING id, nome, email, bio`;

            const result = await pool.query(queryText, valores);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao atualizar parcialmente o usuário:', error);
            throw new Error('Erro ao atualizar parcialmente o usuário');
        }
    }

    async delete(id) {
        try {
            const result = await pool.query(
                'DELETE FROM usuarios WHERE id = $1 RETURNING id, nome',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            throw new Error('Erro ao excluir usuário');
        }
    }
}

export default new PlantService();
