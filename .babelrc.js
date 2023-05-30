module.exports =  {
	"presets": [
	  "@babel/preset-react",
	  [
		"@babel/preset-env",
		{
		  "targets": {
			"browsers": [
			  "last 2 versions",
			  "safari >= 7",
			  "ie > 10"
			]
		  },
		  "useBuiltIns": "usage",
		  "corejs": { "version": 3, "proposals": true }
		}
	  ]
	],
	"plugins": [
	  "autobind-class-methods",
	  "transform-class-properties",
	  "@babel/plugin-proposal-object-rest-spread",
	].concat(process.env.NODE_ENV === 'development' ? "react-refresh/babel" : [])
  }
  