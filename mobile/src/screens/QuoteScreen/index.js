import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
	Quote,
	QuoteControl,
	QuoteLove,
	QuoteStats,
	UserList,
	LoadingIndicator
} from '../../components';
import { HttpService } from '../../services';

export default ({ navigation, route }) => {
	const [quote, setQuote] = useState(null);
	const [loadingQuote, setLoadingQuote] = useState(false);
	const [error, setError] = useState(null);
	const [quoteRemoved] = useState(false);

	const handleRemoveQuote = async (uuid) => {
		
	}

	useEffect(() => {
		const getQuoteDetail = async () => {
			setLoadingQuote(true);
			try {
				const quoteResponse = await HttpService.makeRequest(
					'getQuoteDetail',
					null,
					route.params.uuid,
					true
				);
				setQuote(quoteResponse.data);
				setLoadingQuote(false);
			} catch (err) {
				const msg = err?.error ||
					err?.message ||
					"An unexpected error happened requesting quote's details"
				setError(msg)
				setLoadingQuote(false);
			}
		}

		getQuoteDetail();
	}, [])

	if (loadingQuote) {
		return (
			<LoadingIndicator loadingMessage="Loading quote's details" />
		)
	} else {
		<ScrollView
			contentContainerStyle={styles.container}
		>
			{
				!!error &&
				<Text
					style={styles.error}
				>
					{error}
				</Text>
			}
			<Quote quoteText={quote.quoteBody.text} />
			<QuoteControl
				actionHappened={quoteState.quoteLiked}
				loading={loadingLikeQuote}
				onPressCallback={handleQuoteLike}
			/>
			<View
				style={styles.infoContainer}
			>
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
	}
}

/**
 * {
		"quoteBody": {
				"uuid": "ed711c26-97e9-485a-9509-f5e6b0d593fb",
				"text": "Decentralize",
				"occurrences": 2,
				"likes": 1
		},
		"new": false,
		"userLikes": 0,
		"love": 50,
		"likers": [
				{
						"uuid": "8d03f792-ab8c-4718-a21d-660823b707b7",
						"username": "pororoca",
						"email": "pororoca@poioca.com",
						"UserQuotes": [
								{
										"uuid": "3440d6ce-c8c5-4a46-a09c-5b3305dbcca1",
										"uuid_user": "8d03f792-ab8c-4718-a21d-660823b707b7",
										"uuid_quote": "ed711c26-97e9-485a-9509-f5e6b0d593fb",
										"likes": 1
								}
						]
				}
		]
}
 */