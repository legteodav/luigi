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
            pathSegment: 'demo-library',
            label: 'Demo Library',
            icon: 'paper-plane',
            viewUrl: '/sampleapp.html#/ng-luigi-demo',
            virtualTree: true,
            children: [
              {
                pathSegment: 'example-normal',
                label: 'Normal Component',
                icon: 'paper-plane',
                viewUrl: '/sampleapp.html#/static-component',
                virtualTree: trues
              },
              {
                pathSegment: 'example-static',
                label: 'Demo Library',
                icon: 'paper-plane',
                viewUrl: '/sampleapp.html#/static-component',
                virtualTree: true
              }
            ]
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
