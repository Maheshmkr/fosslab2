const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// URL param binding
router.param('postId', async (req, res, next, postId) => {
  try {
    const post = await Post.findById(postId).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post
router.get('/:postId', (req, res) => res.json(req.post));

// Create post
router.post('/', auth, [
  body('title').notEmpty(),
  body('slug').notEmpty(),
  body('body').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, slug, body: content, tags, published } = req.body;
  try {
    const existing = await Post.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Slug already used' });

    const post = new Post({ title, slug, body: content, tags, published, author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:postId', auth, async (req, res) => {
  if (req.post.author._id.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not allowed' });

  Object.assign(req.post, req.body);
  await req.post.save();
  res.json(req.post);
});

// Delete post
router.delete('/:postId', auth, async (req, res) => {
  if (req.post.author._id.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not allowed' });

  await req.post.deleteOne();
  res.json({ message: 'Post deleted' });
});

// Add comment
router.post('/:postId/comments', auth, [body('text').notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const comment = new Comment({ text: req.body.text, author: req.user._id, post: req.post._id });
  await comment.save();
  await comment.populate('author', 'name');
  res.status(201).json(comment);
});

// Get comments
router.get('/:postId/comments', async (req, res) => {
  const comments = await Comment.find({ post: req.post._id }).populate('author', 'name');
  res.json(comments);
});

module.exports = router;
