define('bb-rendered-view',['require','exports','module','lowercase-backbone','lodash'],function (require, exports, module) {
	

	var view = require('lowercase-backbone').view,
		_    = require('lodash');

	var _init = view.prototype.initialize;

	var rendered = view.extend({

		initialize: function initializeRenderedView(options) {
			// initialize view
			_init.apply(this, _.toArray(arguments));

			// pick some options
			_.each([
				'template',
				'templateCompiler',
				'templateDataDefaults',
				'templateDataParse',
				'render'
			], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);

			// render
			this.render(options);
		},


		// template
		templateCompiler: _.template,
		template: void(0),

		// template data
		templateDataDefaults: {},

		/**
		 * Parses options and returns the data to be used.
		 * The default implementation sets default data.
		 *
		 * @param  {[type]} a [description]
		 * @return {[type]}   [description]
		 */
		templateDataParse: function templateDataParse(options) {
			return _.assign({}, this.templateDataDefaults, options);
		},

		/**
		 * Does the "heavy-lifting" of verifying if template
		 * is available and in what format.
		 * Also runs data parsing before rendering template.
		 *
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		render: function render(options) {

			var template = this.template;

			if (template) {
				// only render if a template is available

				// parse out data from options
				var data = this.templateDataParse(options);

				console.log(data)

				if (_.isFunction(template)) {
					// run template fn straightforward
					var html = template(data);

				} else if (_.isString(template)) {
					// compile template then run
					var html = this.templateCompiler(template)(data);
				}

				this.$el.html(html);


			}

			return this;
		}
	});


	module.exports = rendered;
});

