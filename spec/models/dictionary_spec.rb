# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Dictionary, type: :model do
  subject { build(:dictionary) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:words).dependent(:destroy) }
    it { is_expected.to have_many(:tags_dictionaries).dependent(:destroy) }
    it { is_expected.to have_many(:tags).through(:tags_dictionaries) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(255) }
    it { is_expected.to validate_uniqueness_of(:title).case_insensitive.scoped_to(:user_id) }
    it do
      is_expected.to enumerize(:language)
        .in(*Dictionary::SUPPORTED_LANGUAGES)
        .with_default(I18n.locale)
        .with_i18n_scope('models.dictionary.languages')
        .with_predicates(true)
        .with_scope(true)
    end
  end
end
