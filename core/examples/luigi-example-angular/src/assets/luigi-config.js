Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/sampleapp.html#/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sampleapp.html#/sample1'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/sampleapp.html#/sample2'
          },
          {
            category: { label: 'Luigi Library', icon: 'dimension' },
            pathSegment: 'demo-library',
            label: 'Demo Library',
            viewUrl: '/sampleapp.html#/ng-luigi-demo',
            virtualTree: true
          },
          {
            category: 'Luigi Library',
            pathSegment: 'example-normal',
            label: 'Normal Component',
            viewUrl: '/sampleapp.html#/example-normal',
            virtualTree: true
          },
          {
            category: 'Luigi Library',
            pathSegment: 'example-static',
            label: 'Static Component',
            viewUrl: '/sampleapp.html#/example-static',
            virtualTree: true
          },
          {
            category: { label: 'Links', icon: 'cloud' },
            label: 'Luigi Project',
            externalLink: {
              url: 'https://luigi-project.io/'
            }
          },
          {
            category: 'Links',
            label: 'Angular',
            externalLink: {
              url: 'https://angular.io/'
            }
          }
        ]
      }
    ]
  },
  settings: {
    header: {
      title: 'Luigi Angular App',
      logo: '/logo.svg'
    },
    responsiveNavigation: 'simpleMobileOnly'
  }
});
