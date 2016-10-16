var categoryTree = [
    {
        display: 'All Sources',
        value: ''
    },
    {
        display: 'Technology',
        value: 'technology',
        children: [
            // 国外的最大的rss 网站
            //{
                //display: 'TechCrunch',
                //value: 'techcrunch'
            //},
            {
                display: 'Hacker News',
                value: 'hackernews'
            },
            {
                display: 'Wired.com',
                value: 'wired'
            },
            {
                display: 'Mashable',
                value: 'mashable'
            },
            {
                display: 'The Atlantic',
                value: 'theatlantic'
            },
            {
                display: 'Ars Technica',
                value: 'arstechnica'
            }
        ]
    },
    {
        display: 'Frontend',
        value: 'frontend',
        children: [
            {
                display: '稀金前端',
                value: 'xitu'
            }
        ]
    },
    {
        display: 'nodejs',
        value: 'node',
        children: [
            {
                display: 'node weekly',
                value: 'nodeweekly'
            }
        ]
    },

    {
        display: 'Blogs',
        value: 'blogs',
        children: [
            {
                display: '阮一峰',
                value: 'ruanyifeng'
            },
            {
                display: '天镶',
                value: 'tianyu'
            },
            {
                display: 'jerryQu',
                value: 'jerryQu'
            },
            {
                display: '十年踪迹',
                value: 'shinianzongji'
            },
            {
                display: 'Coding Horror (Jeff Atwood)',
                value: 'codinghorror'
            },
            {
                display: 'Chris Dixon',
                value: 'chrisdixon'
            },
            {
                display: 'Smashing Magazine',
                value: 'smashingmagazine'
            }
        ]
    },
    {
        display: 'Career',
        value: 'career',
        children: [
            {
                display: 'The Muse',
                value: 'themuse'
            },
            {
                display: 'Inc.com',
                value: 'inc'
            },
            {
                display: 'Entrepreneur.com',
                value: 'entrepreneur'
            },
            {
                display: 'KQED MindShift',
                value: 'mindshift'
            }
        ]
    },
];

function createIndents (inputArray, outputArray, level) {
    inputArray.forEach(function (item) {
        var children = item.children ? item.children.slice(0) : null;

        // reformat the item
        delete item.children;
        for (var i = 0; i < level; i++) {
            item.display = '- ' + item.display;
        }
        outputArray.push(item);

        // enter children in tree if they exist
        if (children) createIndents(children, outputArray, level + 1);
    });
}

var categories = [];

// create flat structure with indents
createIndents(categoryTree, categories, 0);

module.exports = categories;
