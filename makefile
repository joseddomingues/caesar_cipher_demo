all:
	python scripts/cypher.py --main_text_file texts/main_text.txt --clue_text_file texts/clue_1.txt --game_code benji-bananas --shift 3	
	python scripts/cypher.py --main_text_file texts/main_text.txt --clue_text_file texts/clue_2.txt --game_code sweet-dust --shift 2	
	python scripts/cypher.py --main_text_file texts/main_text.txt --clue_text_file texts/clue_3.txt --game_code prime-enterprise --shift 5	
	python scripts/cypher.py --main_text_file texts/main_text.txt --clue_text_file texts/clue_4.txt --game_code magic-durian --shift 1	
	python scripts/cypher.py --main_text_file texts/main_text.txt --clue_text_file texts/clue_5.txt --game_code exalted-cosmos --shift 4	

clean:
	rm -f texts/*encrypted*
