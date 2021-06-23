import express from 'express'

export interface ExRequest extends express.Request {
    user: any
}