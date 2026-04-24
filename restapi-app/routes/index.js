const express = require('express');
const router = express.Router();
const storage = require('../storage');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated item ID
 *         name:
 *           type: string
 *           description: Item name
 *         description:
 *           type: string
 *           description: Item description
 *       example:
 *         id: 1
 *         name: Laptop
 *         description: A portable computer
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Retrieve all items
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/items', async (req, res) => {
  const items = await storage.getItems();
  res.json(items);
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Retrieve a single item by ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the item to retrieve
 *     responses:
 *       200:
 *         description: Item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = await storage.getItemById(id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
router.post('/items', async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const newItem = await storage.createItem({ name, description });
  res.status(201).json(newItem);
});

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.put('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = await storage.updateItem(id, req.body);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the item to delete
 *     responses:
 *       204:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
router.delete('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = await storage.deleteItem(id);
  if (!deleted) return res.status(404).json({ message: 'Item not found' });
  res.status(204).send();
});

module.exports = router;