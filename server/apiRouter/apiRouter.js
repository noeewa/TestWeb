import express from "express"
import { insertPages, insertContent, insertParaf, insertAcc } from "../db/insertValue.js"
import { insertPage } from "../controller/createPage.js"
import { getPages, getPageById, getAllPagesWithContents } from "../controller/getPage.js"
import { getConnectionDB } from "../db/getConnectionDB.js"
import { getAuth } from "../controller/getAuth.js"
import bcrypt from "bcryptjs"

export const apiRouter = express.Router()

// Simple in-memory session storage (in production, use proper session management)
const sessions = new Map();
apiRouter.post('/createPage', async (req, res) => {
    const { headline, subtitle, sections } = req.body
    try {
        const pageId = await insertPage(headline, subtitle, sections)
        if (pageId) {
            res.status(201).json({ success: true, message: 'Page created successfully', id: pageId })
        } else {
            res.status(500).json({ success: false, message: 'Failed to create page' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating page', error: err.message })
    }
})

// Get all pages
apiRouter.get('/pages', async (req, res) => {
    try {
        const pages = await getPages()
        res.json({ success: true, pages })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching pages', error: err.message })
    }
})

// Get all pages with contents
apiRouter.get('/pages/all', async (req, res) => {
    try {
        const pages = await getAllPagesWithContents()
        res.json({ success: true, pages })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching pages', error: err.message })
    }
})

// Get single page by ID with contents
apiRouter.get('/pages/:id', async (req, res) => {
    try {
        const pageId = parseInt(req.params.id)
        if (isNaN(pageId)) {
            return res.status(400).json({ success: false, message: 'Invalid page ID' })
        }
        const page = await getPageById(pageId)
        if (page) {
            res.json({ success: true, page })
        } else {
            res.status(404).json({ success: false, message: 'Page not found' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching page', error: err.message })
    }
})
apiRouter.post('/create/:layer', async (req, res) => {
    const { layer } = req.params
    let result = null
    // getConnectionDB is now synchronous
    if (layer.toLocaleLowerCase() === 'pages') {
        const { headline, subtitle } = req.body
        result = await insertPages(headline, subtitle)
        res.status(200).json({ success: true, message: `${layer} has successfully created`, id: result })
    } else if (layer.toLocaleLowerCase() === 'content') {
        const { title, page_id } = req.body
        result = await insertContent(title, page_id)
        res.status(200).json({ success: true, message: `${layer} has successfully created`, id: result })
    } else if (layer.toLocaleLowerCase() === 'paragraf') {
        const { content_id, paragraf } = req.body
        await insertParaf(content_id, paragraf)
        res.status(200).json({ success: true, message: `${layer} has successfully created` })
    } else {
        res.status(400).json({ success: false, message: 'Invalid layer type' })
    }
})

apiRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() ||
            !password.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            })
        }
        await insertAcc(username, password)    
        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Register failed',
            error: err.message
        })
    }
})

apiRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() ||
            !password.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            })
        }

        const user = await getAuth(username)
        const isValid = await bcrypt.compare(password, user.password)
        
        if (user) {
            // Create a simple session
            if (!isValid) {
                throw new Error('Invalid Password')
            }
            const sessionId = Math.random().toString(36).substring(2);
            sessions.set(sessionId, { username: user.username });
            
            // Set cookie for session
            res.setHeader('Set-Cookie', `session=${sessionId}; Path=/; HttpOnly; SameSite=Lax`);
            
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: { username: user.username }
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            })
        }
    } catch(err) {
        console.error('Login error:', err)
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: err.message
        })
    }
})

apiRouter.get('/status', (req, res) => {
    // Check for session cookie
    const cookieHeader = req.headers.cookie;
    let sessionId = null;
    
    if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});
        sessionId = cookies['session'];
    }
    
    if (sessionId && sessions.has(sessionId)) {
        const session = sessions.get(sessionId);
        res.json({
            status: true,
            Users: session.username
        })
    } else {
        res.json({
            status: false,
            Users: null
        })
    }
})

apiRouter.post('/logout', (req, res) => {
    const cookieHeader = req.headers.cookie;
    
    if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});
        const sessionId = cookies['session'];
        if (sessionId) {
            sessions.delete(sessionId);
        }
    }
    
    res.setHeader('Set-Cookie', 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.json({ success: true, message: 'Logged out' });
})
