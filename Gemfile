# NOTE Run `bundle install` after updating Gemfile.

source "https://rubygems.org"

# NOTE If the site is to be hosted on GitHub Pages, use github-pages.
# Otherwise, use jekyll. The github-pages gem is a superset of jekyll:
gem "github-pages", group: :jekyll_plugins
# gem "jekyll", "~> 4.2.2"

gem "faraday-retry", "~> 2.0"
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
gem "prettier"
gem "wdm", "~> 0.1.1", platforms: %i[mingw x64_mingw mswin]
gem "webrick"

platforms :mingw, :x64_mingw, :mswin, :jruby do
	gem "tzinfo", "~> 1.2"
	gem "tzinfo-data"
end
