import axios from "axios";

import React from 'react'

export const Interceptor = axios.create({
    baseURL:'https://booking-app-db.vercel.app'
}) 


