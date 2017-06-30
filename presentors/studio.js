'use strict';

class StudioPresentor {
  constructor({
    _id,
    name,
    description,
    slug,
    links,
    games
  }) {
    this.id = _id;
    this.name = name;
    this.description = description;
    this.slug = slug;
    this.links = links;
    this.games = games.filter((game) => game.active);
  }

  render() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      slug: this.slug,
      links: this.links,
      games: this.games
    };
  }
}

module.exports = StudioPresentor;