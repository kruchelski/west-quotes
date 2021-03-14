import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import {
	Quote,
	QuoteControl,
	QuoteLove,
	QuoteStats,
	UserList,
	LoadingIndicator
} from '../../components';
import { HttpService } from '../../services';
import styles from './styles';

export default ({ navigation, route }) => {
	const [quote, setQuote] = useState(null);
	const [loadingQuote, setLoadingQuote] = useState(true);
	const [error, setError] = useState(null);
	const [quoteRemoved, setQuoteRemoved] = useState(false);
	const [loadingRemoveQuote, setLoadingRemoveQuote] = useState(false)

	const handleRemoveQuote = async () => {
		setLoadingRemoveQuote(true);

		try {
			await HttpService.makeRequest(
				'dislikeQuote',
				null,
				quote.quoteBody.uuid,
				true
			)
			setQuoteRemoved(true);
			setLoadingRemoveQuote(false);
		} catch (err) {
			const msg = err?.error ||
				err?.message ||
				"An unexpected error happened requesting quote's details"
			setError(msg)
			setLoadingRemoveQuote(false);
		}
	}

	useEffect(() => {
		const getQuoteDetail = async () => {
			setLoadingQuote(true);
			try {
				const quoteResponse = await HttpService.makeRequest(
					'getQuoteDetails',
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

	if (loadingQuote || !quote?.quoteBody?.uuid) {
		return (
			<LoadingIndicator loadingMessage="Loading quote's details" />
		)
	} else if (!!error) {
		return (
			<Text
				style={styles.error}
			>
				{error}
			</Text>
		)
	} else {
		return (
			<ScrollView
				contentContainerStyle={styles.container}
			>
				<Quote quoteText={quote.quoteBody.text} />
				<View
					style={styles.infoContainer}
				>
					<QuoteLove quoteLove={quote.love} />
					<QuoteStats
						occurrences={quote.quoteBody.occurrences}
						likes={quote.quoteBody.likes}
						userLikes={quote.userLikes}
					/>
					<View
						style={{ height: 20}}
					/>
					<QuoteControl
						actionHappened={quoteRemoved}
						loading={loadingRemoveQuote}
						onPressCallback={handleRemoveQuote}
						actionHappenedMsg='Disliked!'
						severity='danger'
						icon='dislike1'
					/>
					<View
						style={{ height: 30 }}
					/>
					<UserList
						likers={quote.likers}
						newQuote={false}
					/>
				</View>
			</ScrollView>
		)
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