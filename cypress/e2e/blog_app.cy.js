describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
            .then((response) => {
                cy.visit('http://localhost:3000')
            })
    })

    it('Login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
    })
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('salainen')
            cy.contains('login').click()

            cy.contains('Matti Luukkainen logged in')
        })
        it('fails with wrong credentials', function () {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('wrong')
            cy.contains('login').click()

            cy.contains("login") // Fials need to login again
        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({
                username: 'mluukkai',
                password: 'salainen'
            })
        })
        it('A blog can be created and the user could like it or delete it', function () {
            cy.contains('Create new blog').click()
            cy.createBlog({
                title: 'HTML is hard',
                author: 'HieuNguyen',
                url: '1234qwer'
            })
            cy.contains('HTML is hard HieuNguyen')
            cy.contains('view').click()
            cy.contains('upVote').click()
            cy.get('.likes').contains('1')
            cy.contains('Delete').click()
            cy.get('.blog').should('not.exist')
        })
        it('Blogs are ordered', function () {
            cy.contains('Create new blog').click()
            cy.createBlog({
                title: 'HTML is hard',
                author: 'HieuNguyen',
                url: '1234qwer'
            })
            cy.createBlog({
                title: 'HTML is medium',
                author: 'HieuNguyen',
                url: '1234qwer'
            })
            cy.get('.View').eq(0).click()
            cy.get('.View').eq(1).click()
            cy.get('.UpVote').eq(1).click()
            cy.get('.blog').eq(0).contains('HTML is medium')
        })
    })
})

