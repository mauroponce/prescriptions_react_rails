import React from 'react';
import Autosuggest from 'react-autosuggest';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class IngredientsAutosuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      data: [],
      suggestions: []
    };
  }

  componentDidMount() {
    // TODO: Fetch from API
    const data = [
      {
        title: 'Ingredients',
        items: [
          {
            id: 1,
            name: 'Allantoin',
            minimum: 1,
            maximum: 2,
            description: 'Some Allantoin'
          },
          {
            id: 2,
            name: 'Aloe',
            minimum: 1,
            maximum: 2,
            description: 'Some Aloe'
          },
          {
            id: 9,
            name: 'Caffeine',
            minimum: 0.5,
            maximum: 1.5,
            description: 'Some coffee'
          },
        ]
      },
      {
        title: 'Formulations',
        items: [
          {
            name: 'A Crema 1',
            ingredient_ids: [2, 9]
          },
          {
            name: 'Crema 2',
            ingredient_ids: [1, 2]
          }
        ]
      }
    ];

    this.setState({ data });
  }

  onChange = (_event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  getSectionSuggestions(section) {
    return section.items;
  }

  renderSectionTitle(section) {
    return (
      <strong>{section.title}</strong>
    );
  }

  renderSuggestion(suggestion) {
    const isFormulation = 'ingredient_ids' in suggestion;
    if (isFormulation) {
      suggestion.description = this.concatIngredientNames(suggestion.ingredient_ids);
    }
    return (
      <div>
        <div>{suggestion.name}</div>
        <small>{suggestion.description}</small>
      </div>
    );
  }

  concatIngredientNames(ingredientIds) {
    const ingredientsSection = this.state.data[0];
    return ingredientsSection.items
      .filter(item => ingredientIds.includes(item.id))
      .map(item => item.name).join(', ')
  }

  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    return this.state.data.map(section => {
      return {
        title: section.title,
        items: section.items.filter(item => regex.test(item.name))
      };
    })
      .filter(section => section.items.length > 0);
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    debugger
    this.props.onSuggestionSelected();
  }

  render() {
    if (!this.state.data.length) return <div>Loading...</div>

    const { placeholder } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        renderSectionTitle={this.renderSectionTitle.bind(this)}
        getSectionSuggestions={this.getSectionSuggestions.bind(this)}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
    );
  }
}

export default IngredientsAutosuggest;