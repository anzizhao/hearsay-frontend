var categoryTree = [
    {
        display: 'All Sources',
        value: ''
    },
    {
        display: '科学',
        value: 'science',
        children: [
            {
                display: '科学松鼠',
                value: 'songshuhui'
            },
            {
                display: '科学网',
                value: 'sciencesite'
            },
            {
                display: 'Wired Science',
                value: 'wired'
            }
        ]
    },
    {
        display: '技术',
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
        display: 'js',
        value: 'frontend',
        children: [
            {
                display: '稀金前端',
                value: 'xitu'
            },
            {
                display: '伯乐在线',
                value: 'bole'
            },
            {
                display: 'Medium',
                value: 'medium'
            },
            {
                display: 'Smashing Magazine',
                value: 'smashingmagazine'
            },
            {
                display: 'Ourjs',
                value: 'ourjs'
            },
            {
                display: 'Nodeweekly',
                value: 'nodeweekly'
            },
            {
                display: 'segmentFault',
                value: 'segmentfault'
            },
            {
                display: 'sitepoint',
                value: 'sitepoint'
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
                display: 'jerryQu',
                value: 'jerryQu'
            },
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
