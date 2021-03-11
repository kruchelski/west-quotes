import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Quote, QuoteImage, LoadingIndicator } from '../../components';
import { useQuote } from '../../hooks';
import { mainTheme } from '../../constants'
import styles from './styles';

export default ({ navigation, route }) => {

	const { quoteState, getQuote, quoteErrorHandler } = useQuote();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const requestQuote = async () => {
			setLoading(true);
			try {
				await getQuote();
			} catch (err) {
				quoteErrorHandler(err, 'An error happened while trying to get a quote');
			} finally {
				setLoading(false);
			}
		}

		if (!!!quoteState?.quote?.quoteBody?.uuid) {
			requestQuote();
		}
	}, [])


	if (!!!quoteState?.quote?.quoteBody?.uuid || loading) {
		
		return (
			<LoadingIndicator loadingMessage='Loading quote'/>
		)

	} else {
		const { image, imageQuery, quote } = quoteState;
		return (
			<View
				style={styles.container}
			>
				<Quote quoteText={quote.quoteBody.text} />
				<ScrollView
					contentContainerStyle={styles.infoContainer}
				>
					<QuoteImage quoteImage={ image } />

					<Text>UUID</Text>
					<Text>{quote.quoteBody.uuid}</Text>
					<Text>Ocurrences</Text>
					<Text>{quote.quoteBody.occurrences}</Text>
					<Text>Likes</Text>
					<Text>{quote.quoteBody.likes}</Text>
				</ScrollView>

			</View>
		);
	}

}

/**
 * Object {
  "image": "https://images.unsplash.com/photo-1544200502-6652e105f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTI5ODZ8MHwxfHNlYXJjaHwxOHx8bWUlMjBvZnxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
  "imageQuery": "me of",
  "quote": Object {
    "likers": Array [],
    "love": 0,
    "new": true,
    "quoteBody": Object {
      "likes": 0,
      "occurrences": 1,
      "text": "One of my favorite of many things about what the Trump hat represents to me is that people can't tell me what to do because I'm black",
      "uuid": "6ff811de-953c-4a5c-a0b8-f538d4e0b778",
    },
    "userLikes": 0,
  },
}
 */