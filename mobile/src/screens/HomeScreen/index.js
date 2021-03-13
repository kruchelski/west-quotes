import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
	PreQuote,
	Quote,
	QuoteControl,
	QuoteImage,
	QuoteLove,
	QuoteStats,
	UserList,
	LoadingIndicator
} from '../../components';
import { useQuote } from '../../hooks';
import styles from './styles';

export default ({ navigation, route }) => {

	const { quoteState, likeQuote, getQuote, quoteErrorHandler } = useQuote();
	const [loading, setLoading] = useState(false);
	const [loadingLikeQuote, setLoadingLikeQuote] = useState(false);

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

	const handleQuoteLike = async () => {
		setLoadingLikeQuote(true);
		try {
			await likeQuote(quoteState.quote.quoteBody.uuid);
			setLoadingLikeQuote(false);
		} catch (err) {
			quoteErrorHandler(err, 'An error happened while tyring to like a quote');
			setLoadingLikeQuote(false);
		}
	}


	if (!!!quoteState?.quote?.quoteBody?.uuid || loading) {

		return (
			<LoadingIndicator loadingMessage='Loading quote' />
		)

	} else {
		const { image, imageQuery, quote } = quoteState;
		return (
			<ScrollView
				contentContainerStyle={styles.container}
			>
				<PreQuote />
				<Quote quoteText={quote.quoteBody.text} />
				<QuoteControl 
					actionHappened={quoteState.quoteLiked}
					loading={loadingLikeQuote}
					onPressCallback={handleQuoteLike}
					actionHappenedMsg='Liked!'
					severity='primary'
					icon='like1'
				/>
				<View
					style={styles.infoContainer}
				>
					<QuoteImage quoteImage={image} />
					<QuoteLove quoteLove={quote.love} />
					<QuoteStats 
						occurrences={quote.quoteBody.occurrences} 
						likes={quote.quoteBody.likes}
						userLikes={quote.userLikes}
					/>
					<UserList
						likers={quote.likers}
						newQuote={quote.new}
					/>
				</View>
			</ScrollView>
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

/**
 * Object {
  "image": "https://images.unsplash.com/photo-1574895633108-1d93d96c73bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI5ODZ8MHwxfHNlYXJjaHwyOHx8aW4lMjB0aGV8ZW58MHx8fHwxNjE1NTEyOTc5&ixlib=rb-1.2.1&q=80&w=1080",
  "imageQuery": "in the",
  "quote": Object {
    "likers": Array [
      Object {
        "UserQuotes": Array [
          Object {
            "likes": 1,
            "uuid": "b8b30ef1-14d8-4756-ac2d-08eb179358da",
            "uuid_quote": "59c99453-e769-47de-975f-b025b9456f63",
            "uuid_user": "7b9b50bf-fa51-41d6-8af7-17b5ca261827",
          },
        ],
        "email": "pudim@pudim.com",
        "username": "pudim",
        "uuid": "7b9b50bf-fa51-41d6-8af7-17b5ca261827",
      },
    ],
    "love": 100,
    "new": false,
    "quoteBody": Object {
      "likes": 1,
      "occurrences": 1,
      "text": "Culture is the most powerful force in humanity under God",
      "uuid": "59c99453-e769-47de-975f-b025b9456f63",
    },
    "userLikes": 0,
  },
}


 */