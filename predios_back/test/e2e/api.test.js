const axios = require('axios')

describe('API E2E Test Suite', () => {
    test.todo('GET / - should return 7 items and status to be 200')
    test.todo('POST / - should save and item and return message')

    test('GET / - should return 7 items and status to be 200', async () => {
        const response = await axios.get('http://localhost:3000/predio')
        
        expect(response.status).toBe(200)
        expect(response.data.length).toEqual(7) 
    })

    test('POST / - should save and item and return message', async () => {
        const response = await axios.post('http://localhost:3000/predio',{
            nome: "b5",
            sigla: "b5",
            andares: 1,
            rua: "rua x"
        })

        const expectResponse = { success: "Incluído com sucesso." }
        expect(response.data).toStrictEqual(expectResponse)
    })

    test('GET / - should return more one items and status to be 200', async () => {
        const response = await axios.get('http://localhost:3000/predio')
        
        expect(response.status).toBe(200)
        expect(response.data.length).toEqual(8) 
    })

    test('DELETE / - should return an array', async () => {
        const response = await axios.delete('http://localhost:3000/predio')


        const expectResponse = { ok: 1 }
        expect(JSON.parse(response.text)).toStrictEqual(expectResponse)
    })

    // test('GET / - should return an array with length 0', async () => {
    //     const response = await supertest(Server)
    //     .get('/')

    //     const data = JSON.parse(response.text);
    //     expect(data).toBeInstanceOf(Array)
    //     expect(data.length).toEqual(0)

    //     console.log('text',data)
    // })
})