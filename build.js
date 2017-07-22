const metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    highlighter = require('highlighter'),
    templates = require('metalsmith-templates'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    define = require('metalsmith-define'),
    pagination = require('metalsmith-pagination'),
    snippet = require('metalsmith-snippet')


metalsmith(__dirname)
    .source('src')
    .use(define({
        blog: {
            url: 'http://www.gajit.info',
            title: 'Gajit',
            description: 'Hello world.'
        },
        owner: {
            url: 'http://www.gajit.info',
            name: 'Blake Embrey'
        },
        moment: require('moment')
    }))
    .use(collections({
        articles: {
            pattern: 'articles/**/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(pagination({
        'collections.articles': {
            perPage: 5,
            first: 'index.html',
            path: 'page/:num/index.html',
            template: 'index.jade'
        }
    }))
    .use(markdown({
        gfm: true,
        tables: true,
        highlighter: highlighter()
    }))
    .use(snippet({
        stop: ['<span class="more">']
    }))
    .use(permalinks())
    .use(templates({
        engine: 'jade',
        directory: 'templates'
    }))
    .destination('build')
    .build(err => {
        if (err) {
            throw err
        }
    })
